import {compose} from 'node:stream';
import {spec} from 'node:test/reporters';

import {testReporterFilter} from './testreporterutils.js';

const reporter = compose(testReporterFilter, spec);
reporter.on('error', (err) => {
  if ('code' in err && err.code === 'ABORT_ERR') {
    return;
  }
  throw err;
});

export default reporter;
