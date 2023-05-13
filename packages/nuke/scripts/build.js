import fs from 'node:fs';
import path from 'node:path';

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) {
      yield* walk(entry);
    } else if (d.isFile()) {
      yield entry;
    }
  }
}

const cssRegex = /\.module\.css$/;
for await (const p of walk('lib')) {
  if (cssRegex.test(p)) {
    console.log(`copying ${p}`);
    await fs.promises.copyFile(p, path.join('dist', p));
  }
}
