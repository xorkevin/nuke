import React from 'react';
import {Container, Grid, Img} from '@xorkevin/nuke';

import {thamesPreview} from 'config';

const HomeContainer = () => {
  return (
    <div>
      <Img
        className="dark"
        src="/static/thames.jpg"
        preview={thamesPreview}
        size="full"
      >
        <Container fill padded narrow>
          <Grid fill align="center">
            <header className="home-header">
              <h1 className="colossal">Nuke</h1>
              <h4>a reactive frontend toolkit</h4>
            </header>
          </Grid>
        </Container>
      </Img>
    </div>
  );
};

export default HomeContainer;
