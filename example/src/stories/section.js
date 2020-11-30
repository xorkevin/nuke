import {Fragment} from 'react';

import {Story} from 'docs';

import Section from '@xorkevin/nuke/src/component/section';

const Stories = () => (
  <Fragment>
    <p>
      <code>Section</code> is used to display an independent unit of content.
    </p>
    <Story>
      <Section>
        <h1>Section Title</h1>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
          dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit sit
          amet, egestas ut risus. In hac habitasse platea dictumst. Vivamus nibh
          enim, dignissim quis consequat at, sagittis in magna.
        </p>
      </Section>
    </Story>
  </Fragment>
);

export default Stories;
