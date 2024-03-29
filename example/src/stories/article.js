import {Fragment} from 'react';

import {Story} from 'docs';

import Article from '@xorkevin/nuke/src/component/article';
import {Grid, Column} from '@xorkevin/nuke/src/component/grid';
import Img from '@xorkevin/nuke/src/component/image';
import {shanghaiPreview} from 'config';

const Stories = () => (
  <Fragment>
    <p>
      <code>Article</code> is used to display articles.
    </p>
    <Story>
      <Article
        title="Lorem ipsum"
        subtitle="Dolor sit amet"
        author={{
          name: 'Kevin Wang',
          bio: 'Tech evangelist and web dev. Experiences decision fatigue daily.',
          img: '/static/shanghai.jpg',
          imgpreview: shanghaiPreview,
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
        <h2>Consectetur adipiscing elit</h2>
        <p>
          Ut consectetur est lectus, sed maximus libero malesuada ut. Proin
          aliquet, sapien et pretium feugiat, dui diam posuere diam, ut tempor
          elit purus quis metus.
        </p>
        <Img
          className="fullwidth"
          src="/static/shanghai.jpg"
          preview={shanghaiPreview}
        />
        <Img
          className="outset"
          src="/static/shanghai.jpg"
          preview={shanghaiPreview}
        />
        <div className="caption">Hello, World</div>
        <Img src="/static/shanghai.jpg" preview={shanghaiPreview} />
        <Img
          className="inset"
          src="/static/shanghai.jpg"
          preview={shanghaiPreview}
        />
        <Img
          className="inset-half"
          src="/static/shanghai.jpg"
          preview={shanghaiPreview}
        />
        <Grid className="outset" nowrap>
          <Column grow="1">
            <Img src="/static/shanghai.jpg" preview={shanghaiPreview} />
          </Column>
          <Column grow="1">
            <Img src="/static/shanghai.jpg" preview={shanghaiPreview} />
          </Column>
        </Grid>
        <Grid className="outset-double" nowrap>
          <Column grow="1">
            <Img src="/static/shanghai.jpg" preview={shanghaiPreview} />
          </Column>
          <Column grow="1">
            <Img src="/static/shanghai.jpg" preview={shanghaiPreview} />
          </Column>
          <Column grow="1">
            <Img src="/static/shanghai.jpg" preview={shanghaiPreview} />
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
        <h2>
          Integer fringilla <small>small text</small>
        </h2>
        <h3>
          Aliquet condimentum <small>small text</small>
        </h3>
        <h4>
          Nunc facilisis <small>small text</small>
        </h4>
        <h5>
          Orci dui sit amet <small>small text</small>
        </h5>
        <h6>
          Dictum massa porta at <small>small text</small>
        </h6>
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
        <ol>
          <li>Here is a list</li>
          <li>of several items</li>
          <li>to showcase</li>
          <li>formatting.</li>
        </ol>
        <p>
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Integer a sagittis nibh, sit amet posuere
          sapien. Aliquam erat volutpat. Phasellus vitae cursus turpis, posuere
          viverra diam.
        </p>
        <blockquote>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <blockquote>
            <p>Integer fringilla aliquet condimentum.</p>
          </blockquote>
        </blockquote>
        <p>
          Fusce mollis consectetur ligula. <code>Code: Hello, World</code>
        </p>
      </Article>
    </Story>
  </Fragment>
);

export default Stories;
