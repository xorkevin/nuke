module.exports = {
  name: `wsrun`,
  factory: (require) => {
    const {BaseCommand, WorkspaceRequiredError} = require('@yarnpkg/cli');
    const {
      Configuration,
      Project,
      formatUtils,
      scriptUtils,
      structUtils,
    } = require('@yarnpkg/core');
    const {Command, Option} = require('clipanion');
    const t = require('typanion');

    class WSRunCommand extends BaseCommand {
      static paths = [['workspaces', 'foreachrun']];

      static usage = Command.Usage({
        category: 'Workspace-related commands',
        description: 'run a script on all workspaces',
        details: `
      This command will run a given script on current and all its descendant workspaces. Various flags can alter the exact behavior of the command:

      - If \`-A,--all\` is set, Yarn will run the script on all the workspaces of a project.

      - If \`-R,--recursive\` is set, Yarn will find workspaces to run the script on by recursively evaluating \`dependencies\` and \`devDependencies\` fields, instead of looking at the \`workspaces\` fields.

      - If \`--from\` is set, Yarn will use the packages matching the 'from' glob as the starting point for any recursive search.

      - If \`--dry-run\` is set, Yarn will explain what it would do without actually doing anything.
    `,
        examples: [
          [
            'Run the build script on all descendant packages',
            'yarn workspaces foreachrun -A build',
          ],
          [
            'Run the build script on several packages and all their dependencies, building dependencies first',
            `yarn workspaces foreachrun -R --from 'workspace-a,workspace-b' build`,
          ],
        ],
      });

      static schema = [
        t.hasKeyRelationship(
          'all',
          t.KeyRelationship.Forbids,
          ['from', 'recursive'],
          {missingIf: 'undefined'},
        ),
        t.hasAtLeastOneKey(['all', 'recursive'], {
          missingIf: 'undefined',
        }),
      ];

      from = Option.Array('--from', {
        description:
          'An array of glob pattern idents or paths from which to base any recursion',
      });

      all = Option.Boolean('-A,--all', {
        description: 'Run the script on all workspaces of a project',
      });

      recursive = Option.Boolean('-R,--recursive', {
        description:
          'Run the script on the current workspace and all of its recursive dependencies',
      });

      dryRun = Option.Boolean('-n,--dry-run', {
        description:
          'Print the scripts that would be run, without actually running them',
      });

      scriptName = Option.String();
      args = Option.Proxy();

      async execute() {
        const configuration = await Configuration.find(
          this.context.cwd,
          this.context.plugins,
        );
        const {project, workspace: cwdWorkspace} = await Project.find(
          configuration,
          this.context.cwd,
        );

        if (!this.all && !cwdWorkspace) {
          throw new WorkspaceRequiredError(project.cwd, this.context.cwd);
        }

        await project.restoreInstallState();

        const log = (msg) => {
          this.context.stderr.write(`${msg}\n`);
        };

        let selection = [];
        if (this.from) {
          const matches = new Set(
            this.from.flatMap((pattern) => pattern.split(',')),
          );
          selection = project.workspaces.filter((workspace) => {
            const ident = structUtils.stringifyIdent(workspace.anchoredLocator);
            const cwd = workspace.relativeCwd;
            return matches.has(ident) || matches.has(cwd);
          });
        } else if (this.recursive) {
          selection = [cwdWorkspace];
        } else if (this.all) {
          selection = [...project.workspaces];
        }

        if (this.recursive) {
          const extra = new Set(
            selection.flatMap((workspace) => [
              ...workspace.getRecursiveWorkspaceDependencies(),
            ]),
          );
          selection = [...new Set([...selection, ...extra])];
        }

        const needsProcessing = new Map();

        // A script containing `:` becomes global if it exists in only one workspace.
        for (const workspace of selection) {
          if (!workspace.manifest.scripts.has(this.scriptName)) {
            const accessibleBinaries =
              await scriptUtils.getWorkspaceAccessibleBinaries(workspace);
            if (!accessibleBinaries.has(this.scriptName)) {
              log(
                `Excluding ${workspace.relativeCwd} because it doesn't have a "${this.scriptName}" script`,
              );
              continue;
            }
          }

          // Prevents infinite loop in the case of configuring a script as such:
          // "lint": "yarn workspaces foreach --all lint"
          if (
            this.scriptName === configuration.env.npm_lifecycle_event &&
            workspace.cwd === cwdWorkspace.cwd
          ) {
            log(`Excluding ${workspace.relativeCwd} to prevent recursion`);
            continue;
          }

          log(`Including ${workspace.relativeCwd}`);
          needsProcessing.set(workspace.anchoredLocator.locatorHash, workspace);
        }

        if (this.dryRun) {
          return 0;
        }

        const runCommand = async (workspace) => {
          log(
            `Process started, workspace ${structUtils.prettyLocator(configuration, workspace.anchoredLocator)}`,
          );
          const start = Date.now();

          const exitCode =
            (await this.cli.run(['run', this.scriptName, ...this.args], {
              cwd: workspace.cwd,
              stdout: this.context.stdout,
              stderr: this.context.stderr,
            })) || 0;

          const end = Date.now();
          log(
            `Process exited (exit code ${exitCode}), completed in ${formatUtils.pretty(configuration, end - start, formatUtils.Type.DURATION)}`,
          );

          return exitCode;
        };

        const popWorkspace = () => {
          outer: for (const workspace of needsProcessing.values()) {
            const deps = workspace.manifest.dependencies;
            for (const descriptor of deps.values()) {
              const dep = project.tryWorkspaceByDescriptor(descriptor);
              if (needsProcessing.has(dep?.anchoredLocator.locatorHash)) {
                continue outer;
              }
            }
            return workspace;
          }
          return null;
        };

        while (needsProcessing.size > 0) {
          const workspace = popWorkspace();
          if (workspace === null) {
            const cycle = Array.from(needsProcessing.values())
              .map((workspace) =>
                structUtils.prettyLocator(
                  configuration,
                  workspace.anchoredLocator,
                ),
              )
              .join(', ');

            log(`Dependency cycle detected (${cycle})`);
            return 1;
          }
          const exitCode = await runCommand(workspace);
          if (exitCode !== 0) {
            return exitCode;
          }
          needsProcessing.delete(workspace.anchoredLocator.locatorHash);
        }

        return 0;
      }
    }

    return {
      commands: [WSRunCommand],
    };
  },
};
