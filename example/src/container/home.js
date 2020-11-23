import React from 'react';
import {Container, Section, Grid, CommentSection, Img} from '@xorkevin/nuke';

import {thamesPreview, comments} from 'config';

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

      <Container padded narrow>
        <Section id="typography">
          <h1>Typography</h1>
          <hr />
          <h1>
            Heading 1 <small>small</small>
          </h1>
          <h2>
            Heading 2 <small>small</small>
          </h2>
          <h3>
            Heading 3 <small>small</small>
          </h3>
          <h4>
            Heading 4 <small>small</small>
          </h4>
          <h5>
            Heading 5 <small>small</small>
          </h5>
          <h6>
            Heading 6 <small>small</small>
          </h6>
          <div>
            Text <small>small</small>
          </div>
          <div>
            <code>Code: Hello, World</code>
          </div>
        </Section>
      </Container>

      <CommentSection comments={comments}></CommentSection>
    </div>
  );
};

export default HomeContainer;
