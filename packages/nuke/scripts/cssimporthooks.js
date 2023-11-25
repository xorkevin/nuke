import fs from 'node:fs/promises';
import url from 'node:url';
import path from 'node:path';
import crypto from 'node:crypto';

import postcss from 'postcss';
import postcssModulesScope from 'postcss-modules-scope';
import postcssModulesLocalByDefault from 'postcss-modules-local-by-default';
import icssUtils from 'icss-utils';

const basePath = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  '..',
);

const sha256Hash = (...arr) => {
  const h = crypto.createHash('sha256');
  for (const v of arr) {
    h.update(v, 'utf8');
  }
  return h.digest('base64url');
};

const postcssProcessor = postcss([
  postcssModulesLocalByDefault({mode: 'local'}),
  postcssModulesScope({
    generateScopedName: (name, p) => {
      const s = sha256Hash(path.relative(basePath, p), '__', name).slice(0, 16);
      return `${name}__${s}`;
    },
  }),
]);

const moduleCSSRegex = /\.module\.css$/;

export const load = async (u, context, nextLoad) => {
  if (moduleCSSRegex.test(u)) {
    const p = url.fileURLToPath(u);
    const relativePath = path.relative(basePath, p);
    const result = await postcssProcessor.process(
      await fs.readFile(p, {
        encoding: 'utf8',
      }),
      {
        from: relativePath,
        to: relativePath,
      },
    );
    const {icssExports} = icssUtils.extractICSS(result.root);
    return {
      shortCircuit: true,
      format: 'json',
      source: JSON.stringify(icssExports),
    };
  }
  return await nextLoad(u, context);
};
