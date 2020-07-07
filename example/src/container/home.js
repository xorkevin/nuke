import React from 'react';
import {
  Container,
  Section,
  Grid,
  Column,
  Article,
  CommentSection,
  Img,
} from '@xorkevin/nuke';

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

      <Article
        title="Lorem ipsum"
        subtitle="Dolor sit amet"
        author={{
          name: 'Kevin Wang',
          bio:
            'Tech evangelist and web dev. Experiences decision fatigue daily.',
          img: '/static/thames.jpg',
          preview: thamesPreview,
        }}
        time={Date.now() - 86400000}
        tags={['list', 'of', 'tags']}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
          dictum massa porta at.
        </p>
        <p>
          Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus.
          In hac habitasse platea dictumst. Vivamus nibh enim, dignissim quis
          consequat at, sagittis in magna. Aliquam accumsan, nisl vel
          sollicitudin fringilla, libero neque vehicula mauris, eu laoreet nunc
          ligula convallis nulla. Aliquam felis elit, fermentum ac felis
          sagittis, porttitor placerat odio.
        </p>
        <p>
          Ut consectetur est lectus, sed maximus libero malesuada ut. Proin
          aliquet, sapien et pretium feugiat, dui diam posuere diam, ut tempor
          elit purus quis metus.
        </p>
        <Img
          className="outset-double"
          src="/static/thames.jpg"
          preview={thamesPreview}
        />
        <Img
          className="outset"
          src="/static/thames.jpg"
          preview={thamesPreview}
        />
        <div className="caption">Hello, World</div>
        <Img src="/static/thames.jpg" preview={thamesPreview} />
        <Img
          className="inset"
          src="/static/thames.jpg"
          preview={thamesPreview}
        />
        <Img
          className="inset-half"
          src="/static/thames.jpg"
          preview={thamesPreview}
        />
        <Grid className="outset" nowrap>
          <Column grow="1">
            <Img src="/static/thames.jpg" preview={thamesPreview} />
          </Column>
          <Column grow="1">
            <Img src="/static/thames.jpg" preview={thamesPreview} />
          </Column>
        </Grid>
        <Grid className="outset-double" nowrap>
          <Column grow="1">
            <Img src="/static/thames.jpg" preview={thamesPreview} />
          </Column>
          <Column grow="1">
            <Img src="/static/thames.jpg" preview={thamesPreview} />
          </Column>
          <Column grow="1">
            <Img src="/static/thames.jpg" preview={thamesPreview} />
          </Column>
        </Grid>
        <p>
          Nulla facilisi. Phasellus blandit interdum est, in pellentesque nunc
          fermentum et. Proin nibh risus, sollicitudin ac urna sed, aliquet
          hendrerit massa. Pellentesque vehicula fringilla purus, sit amet
          bibendum turpis malesuada in. Aliquam nisl enim, elementum id dapibus
          at, suscipit non arcu. Suspendisse sodales massa vitae dolor
          vestibulum, lacinia congue enim hendrerit.
        </p>
        <pre>
          This is some example preformatted text that is extremely long and
          might take more than one line.
        </pre>
        <p>
          Curabitur dapibus, arcu a pulvinar pulvinar, lectus elit eleifend
          dolor, id tincidunt nunc dolor eu orci. Sed neque massa, cursus et
          enim quis, gravida fermentum est. Nam non justo accumsan arcu volutpat
          ullamcorper sit amet nec mi.
        </p>
        <p>
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Integer a sagittis nibh, sit amet posuere
          sapien. Aliquam erat volutpat. Phasellus vitae cursus turpis, posuere
          viverra diam.
        </p>
        <p>
          Fusce mollis consectetur ligula. <code>Code: Hello, World</code>
        </p>
      </Article>
      <CommentSection comments={comments}></CommentSection>
    </div>
  );
};

export default HomeContainer;
