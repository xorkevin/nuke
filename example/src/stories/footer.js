import React, {Fragment} from 'react';

import {Story} from 'docs';

import Footer from '@xorkevin/nuke/src/component/footer';
import {Grid, Column} from '@xorkevin/nuke/src/component/grid';
import Anchor from '@xorkevin/nuke/src/component/anchor/nocolor';
import FaIcon from '@xorkevin/nuke/src/component/faicon';

const Stories = () => (
  <Fragment>
    <p>
      <code>Footer</code> renders a site footer.
    </p>

    <Story>
      <Footer>
        <Grid className="dark" justify="center" align="center">
          <Column sm={8}>
            <div className="text-center">
              <h4 className="footer-header">Nuke</h4> a reactive frontend
              toolkit
              <ul>
                <li>
                  <Anchor ext href="https://github.com/xorkevin/nuke">
                    <FaIcon icon="github" /> xorkevin/nuke
                  </Anchor>
                </li>
                <li>
                  <h5>
                    <FaIcon icon="code" /> with <FaIcon icon="heart-o" /> by{' '}
                    <Anchor ext href="https://github.com/xorkevin">
                      <FaIcon icon="github" /> xorkevin
                    </Anchor>
                  </h5>
                </li>
              </ul>
            </div>
          </Column>
        </Grid>
      </Footer>
    </Story>
  </Fragment>
);

export default Stories;
