import {Fragment} from 'react';

import {Story} from 'docs';

import Anchor from '@xorkevin/nuke/src/component/anchor';
import AnchorText from '@xorkevin/nuke/src/component/anchor/text';
import AnchorSecondary from '@xorkevin/nuke/src/component/anchor/secondary';
import AnchorNoColor from '@xorkevin/nuke/src/component/anchor/nocolor';

const Stories = () => (
  <Fragment>
    <p>
      <code>Anchor</code> is used to create links.
    </p>
    <Story>
      <Anchor>This is an unstyled link.</Anchor>
    </Story>
    <p>
      The <code>ext</code> boolean prop may be used for external links.
    </p>
    <Story>
      <Anchor ext href="https://xorkevin.com">
        https://xorkevin.com
      </Anchor>
    </Story>
    <p>
      The variant <code>anchor/text</code> is used to create styled links for
      text.
    </p>
    <Story>
      This is a link for <AnchorText>some text</AnchorText>.
    </Story>
    <p>
      The variant <code>anchor/secondary</code> is used to create a more subdued
      text link.
    </p>
    <Story>
      This is a link for <AnchorSecondary>some text</AnchorSecondary>.
    </Story>
    <p>
      The variant <code>anchor/nocolor</code> is used to create a text link that
      inherits its color.
    </p>
    <Story>
      This is a link for <AnchorNoColor>some text</AnchorNoColor>.
    </Story>
  </Fragment>
);

export default Stories;
