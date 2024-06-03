import path from 'node:path';
import {compose} from 'node:stream';
import {spec} from 'node:test/reporters';

const keepFileRegex = /^lib\//;
const ignoreFileRegex = /\.test\.[jt]sx?$/;

async function* testReporterFilter(source) {
  for await (const event of source) {
    switch (event.type) {
      case 'test:coverage': {
        const {files, totals, workingDirectory} = event.data.summary;
        const nextFiles = [];
        for (const file of files) {
          const relPath = path.relative(workingDirectory, file.path);
          if (keepFileRegex.test(relPath) && !ignoreFileRegex.test(relPath)) {
            nextFiles.push(file);
            continue;
          }
          totals.totalLineCount -= file.totalLineCount;
          totals.totalBranchCount -= file.totalBranchCount;
          totals.totalFunctionCount -= file.totalFunctionCount;
          totals.coveredLineCount -= file.coveredLineCount;
          totals.coveredBranchCount -= file.coveredBranchCount;
          totals.coveredFunctionCount -= file.coveredFunctionCount;
        }
        event.data.summary.files = nextFiles;
        totals.coveredLinePercent =
          (totals.coveredLineCount / totals.totalLineCount) * 100;
        totals.coveredBranchPercent =
          (totals.coveredBranchCount / totals.totalBranchCount) * 100;
        totals.coveredFunctionPercent =
          (totals.coveredFunctionCount / totals.totalFunctionCount) * 100;
        yield event;
        break;
      }
      default:
        yield event;
        break;
    }
  }
}

const reporter = compose(testReporterFilter, spec);
reporter.on('error', (err) => {
  if ('code' in err && err.code === 'ABORT_ERR') {
    return;
  }
  throw err;
});

export default reporter;
