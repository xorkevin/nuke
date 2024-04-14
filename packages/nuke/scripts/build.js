import {Buffer} from 'node:buffer';
import fs from 'node:fs/promises';
import path from 'node:path';

async function* walk(dir) {
  for await (const f of await fs.opendir(dir)) {
    const entry = path.join(dir, f.name);
    if (f.isDirectory()) {
      yield* walk(entry);
    } else if (f.isFile()) {
      yield entry;
    }
  }
}

async function statFile(name) {
  try {
    const s = await fs.stat(name);
    return [s, undefined];
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [undefined, new Error(`File ${name} does not exist`)];
    }
    throw err;
  }
}

async function filesEqual(fname1, fname2) {
  {
    const [s1, err1] = await statFile(fname1);
    if (err1 !== undefined) {
      // file 1 is assumed to exist
      throw err1;
    }
    const [s2, err2] = await statFile(fname2);
    if (err2 !== undefined) {
      // file 2 may not exist
      return false;
    }
    if (s1.size !== s2.size) {
      return false;
    }
  }

  const bufSize = 1024 * 1024;
  let f1, f2;
  try {
    f1 = await fs.open(fname1);
    f2 = await fs.open(fname2);
    const buf1 = Buffer.alloc(bufSize);
    const buf2 = Buffer.alloc(bufSize);
    while (true) {
      const [r1, r2] = await Promise.all([
        f1.read({buffer: buf1}),
        f2.read({buffer: buf2}),
      ]);
      if (r1.bytesRead !== r2.bytesRead) {
        return false;
      }
      if (r1.bytesRead === 0) {
        break;
      }
      if (buf1.compare(buf2, 0, r2.bytesRead, 0, r1.bytesRead) !== 0) {
        return false;
      }
      if (r1.bytesRead < bufSize) {
        break;
      }
    }
    return true;
  } finally {
    if (f1) {
      await f1.close();
    }
    if (f2) {
      await f2.close();
    }
  }
}

const cssRegex = /\.css$/;
for await (const p of walk('lib')) {
  if (cssRegex.test(p)) {
    const dest = path.join('dist', p);
    const destIsEqual = await filesEqual(p, dest);
    if (destIsEqual) {
      console.log(`${p} matches ${dest}; skipping`);
      continue;
    }
    console.log(`copying ${p} to ${dest}`);
    await fs.mkdir(path.dirname(dest), {recursive: true});
    await fs.copyFile(p, dest);
  }
}
