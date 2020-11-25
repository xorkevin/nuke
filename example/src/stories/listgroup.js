import React, {Fragment} from 'react';

import {Story} from 'docs';

import {ListGroup, ListItem} from '@xorkevin/nuke/src/component/listgroup';
import {Grid, Column} from '@xorkevin/nuke/src/component/grid';
import ChipPrimary from '@xorkevin/nuke/src/component/chip/primary';
import Time from '@xorkevin/nuke/src/component/time';

const Stories = () => (
  <Fragment>
    <p>
      <code>ListGroup</code> displays a list of elements.
    </p>
    <Story>
      <ListGroup padded>
        <ListItem>
          <div>here is a list</div>
        </ListItem>
        <ListItem>
          <div>of some items</div>
        </ListItem>
        <ListItem>
          <div>in a list group</div>
        </ListItem>
      </ListGroup>
    </Story>

    <p>
      A <code>ListGroup</code> may be sized <code>sm</code>, <code>md</code>, or{' '}
      <code>lg</code>.
    </p>
    <Story>
      <ListGroup size="sm" padded>
        <ListItem>
          <div>here is a list</div>
        </ListItem>
        <ListItem>
          <div>of some items</div>
        </ListItem>
        <ListItem>
          <div>in a list group</div>
        </ListItem>
      </ListGroup>
      <ListGroup size="md" padded>
        <ListItem>
          <div>here is a list</div>
        </ListItem>
        <ListItem>
          <div>of some items</div>
        </ListItem>
        <ListItem>
          <div>in a list group</div>
        </ListItem>
      </ListGroup>
      <ListGroup size="lg" padded>
        <ListItem>
          <div>here is a list</div>
        </ListItem>
        <ListItem>
          <div>of some items</div>
        </ListItem>
        <ListItem>
          <div>in a list group</div>
        </ListItem>
      </ListGroup>
    </Story>

    <p>
      <code>ListGroup</code> is unopinionated about what it displays.
    </p>

    <Story name="listgroup badge">
      <ListGroup size="sm">
        <ListItem>
          <Grid justify="space-between" align="center">
            <Column>
              <h5>Inbox</h5>
            </Column>
            <Column>
              <ChipPrimary>16</ChipPrimary>
            </Column>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid justify="space-between" align="center">
            <Column>
              <h5>Sent</h5>
            </Column>
            <Column>
              <ChipPrimary>8</ChipPrimary>
            </Column>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid justify="space-between" align="center">
            <Column>
              <h5>Trash</h5>
            </Column>
            <Column>
              <ChipPrimary>2</ChipPrimary>
            </Column>
          </Grid>
        </ListItem>
      </ListGroup>
    </Story>

    <Story>
      <ListGroup size="lg">
        <ListItem>
          <Grid align="center">
            <Column md={20}>
              <h3>Lorem ipsum</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
                dictum massa porta at. Mauris augue nisi, scelerisque ac
                suscipit sit amet, egestas ut risus.
              </p>
            </Column>
            <Column md={4}>
              <Time value={Date.now() - 86400000} />
            </Column>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid align="center">
            <Column md={20}>
              <h3>Dolor sit amet</h3>
              <p>
                In hac habitasse platea dictumst. Vivamus nibh enim, dignissim
                quis consequat at, sagittis in magna.
              </p>
            </Column>
            <Column md={4}>
              <Time value={Date.now() - 86400000} />
            </Column>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid align="center">
            <Column md={20}>
              <h3>Consectetur adipiscing elit</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
                dictum massa porta at. Mauris augue nisi, scelerisque ac
                suscipit sit amet, egestas ut risus.
              </p>
            </Column>
            <Column md={4}>
              <Time value={Date.now() - 3 * 86400000} />
            </Column>
          </Grid>
        </ListItem>
      </ListGroup>
    </Story>
  </Fragment>
);

export default Stories;
