import {Fragment} from 'react';

import {Story} from 'docs';

import Img from '@xorkevin/nuke/src/component/image';
import ImgRounded from '@xorkevin/nuke/src/component/image/rounded';
import ImgCircle from '@xorkevin/nuke/src/component/image/circle';
import Container from '@xorkevin/nuke/src/component/container';
import {thamesPreview} from 'config';

const Stories = () => (
  <Fragment>
    <p>
      <code>Img</code> is an enhanced <code>&lt;img /&gt;</code> element with
      lazy loading.
    </p>
    <Story>
      <Img src="/static/thames.jpg" preview={thamesPreview} />
    </Story>

    <p>
      <code>Img</code> may be supplied a <code>height/width</code> ratio instead
      of a preview placeholder.
    </p>
    <Story>
      <Img src="/static/thames.jpg" ratio={1080 / 1920} />
    </Story>

    <p>
      <code>Img</code> may have children.
    </p>
    <Story>
      <Img src="/static/thames.jpg" preview={thamesPreview}>
        <Container padded>
          <h2>Thames</h2>
        </Container>
      </Img>
      <Img className="dark" src="/static/thames.jpg" preview={thamesPreview}>
        <Container padded>
          <h2>Thames</h2>
        </Container>
      </Img>
      <Img className="light" src="/static/thames.jpg" preview={thamesPreview}>
        <Container padded>
          <h2>Thames</h2>
        </Container>
      </Img>
    </Story>

    <p>
      <code>Img</code> may be sized <code>full</code> or <code>fill</code>.
    </p>
    <Story>
      <Img src="/static/thames.jpg" preview={thamesPreview} size="full" />
      <div style={{height: '256px'}}>
        <Img src="/static/thames.jpg" preview={thamesPreview} size="fill" />
      </div>
    </Story>

    <p>
      The <code>image/rounded</code> and <code>image/circle</code> variants
      create rounded and circular images respectively.
    </p>
    <Story>
      <ImgRounded src="/static/thames.jpg" preview={thamesPreview} />
      <div style={{width: '256px', height: '256px'}}>
        <ImgCircle
          src="/static/thames.jpg"
          preview={thamesPreview}
          size="fill"
        />
      </div>
    </Story>
  </Fragment>
);

export default Stories;
