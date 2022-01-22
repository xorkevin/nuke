import {Fragment} from 'react';

import {Story} from 'docs';

import Img from '@xorkevin/nuke/src/component/image';
import ImgRounded from '@xorkevin/nuke/src/component/image/rounded';
import ImgCircle from '@xorkevin/nuke/src/component/image/circle';
import Container from '@xorkevin/nuke/src/component/container';
import {shanghaiPreview} from 'config';

const Stories = () => (
  <Fragment>
    <p>
      <code>Img</code> is an enhanced <code>&lt;img /&gt;</code> element with
      lazy loading.
    </p>
    <Story>
      <Img src="/static/shanghai.jpg" preview={shanghaiPreview} />
    </Story>

    <p>
      <code>Img</code> may be supplied a <code>width / height</code> ratio
      instead of a preview placeholder.
    </p>
    <Story>
      <Img src="/static/shanghai.jpg" ratio="1920 / 1080" />
    </Story>

    <p>
      <code>Img</code> aspect ratio means that it may be sized by setting only
      the height.
    </p>
    <Story>
      <Img
        src="/static/shanghai.jpg"
        ratio="1920 / 1080"
        style={{height: '256px'}}
      />
    </Story>

    <p>
      <code>Img</code> may have children.
    </p>
    <Story>
      <Img src="/static/shanghai.jpg" preview={shanghaiPreview}>
        <Container padded>
          <h2>Shanghai</h2>
        </Container>
      </Img>
      <Img
        className="dark"
        src="/static/shanghai.jpg"
        preview={shanghaiPreview}
      >
        <Container padded>
          <h2>Shanghai</h2>
        </Container>
      </Img>
      <Img
        className="light"
        src="/static/shanghai.jpg"
        preview={shanghaiPreview}
      >
        <Container padded>
          <h2>Shanghai</h2>
        </Container>
      </Img>
    </Story>

    <p>
      <code>Img</code> may be sized <code>full</code> or <code>fill</code>.
    </p>
    <Story>
      <Img src="/static/shanghai.jpg" preview={shanghaiPreview} size="full" />
      <div style={{height: '256px'}}>
        <Img src="/static/shanghai.jpg" preview={shanghaiPreview} size="fill" />
      </div>
    </Story>

    <p>
      The <code>image/rounded</code> and <code>image/circle</code> variants
      create rounded and circular images respectively.
    </p>
    <Story>
      <ImgRounded src="/static/shanghai.jpg" preview={shanghaiPreview} />
      <div style={{width: '256px', height: '256px'}}>
        <ImgCircle
          src="/static/shanghai.jpg"
          preview={shanghaiPreview}
          size="fill"
        />
      </div>
    </Story>
  </Fragment>
);

export default Stories;
