import React, {Fragment} from 'react';

import {Story} from 'docs';

import {Grid, Column} from '@xorkevin/nuke/src/component/grid';

export const boxes = (
  <Fragment>
    <Column md={8} sm={12}>
      <div style={{height: '256px', border: '1px solid red'}}></div>
    </Column>
    <Column md={8} sm={12}>
      <div style={{height: '128px', border: '1px solid red'}}></div>
    </Column>
    <Column md={8} sm={12}>
      <div style={{height: '256px', border: '1px solid red'}}></div>
    </Column>
    <Column md={8} sm={12}>
      <div style={{height: '128px', border: '1px solid red'}}></div>
    </Column>
    <Column md={8} sm={12}>
      <div style={{height: '256px', border: '1px solid red'}}></div>
    </Column>
    <Column md={8} sm={12}>
      <div style={{height: '128px', border: '1px solid red'}}></div>
    </Column>
    <Column md={8} sm={12}>
      <div style={{height: '128px', border: '1px solid red'}}></div>
    </Column>
  </Fragment>
);

const Stories = () => (
  <Fragment>
    <p>
      <code>Grid</code> displays a grid of elements. The grid is 24 units wide.
    </p>
    <Story>
      <Grid>{boxes}</Grid>
    </Story>
    <p>
      Using the <code>strict</code> prop negates padding.
    </p>
    <Story>
      <Grid strict>{boxes}</Grid>
    </Story>
    <p>
      Using the <code>fill</code> prop expands the grid to take up all the space
      of its parent.
    </p>
    <Story>
      <div style={{height: '1024px'}}>
        <Grid fill cjustify="flex-end">
          {boxes}
        </Grid>
      </div>
    </Story>
    <p>
      The <code>nowrap</code> prop prevents wrapping.
    </p>
    <Story>
      <Grid nowrap>{boxes}</Grid>
    </Story>
    <p>
      The <code>direction</code> prop may be used to determine in what direction
      items are displayed.
    </p>
    <Story>
      <Grid direction="column-reverse">{boxes}</Grid>
    </Story>
    <p>
      The <code>justify</code> prop may be used to manage remanining space on
      the major axis.
    </p>
    <Story>
      <Grid justify="center">{boxes}</Grid>
    </Story>
    <p>
      The <code>cjustify</code> prop may be used to manage remanining space on
      the minor axis.
    </p>
    <Story>
      <Grid cjustify="center">{boxes}</Grid>
    </Story>
    <p>
      The <code>align</code> prop may be used to align items on the minor axis.
    </p>
    <Story>
      <Grid align="center">{boxes}</Grid>
    </Story>
  </Fragment>
);

export default Stories;
