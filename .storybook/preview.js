import {addDecorator, addParameters} from '@storybook/react';
import {withContexts} from '@storybook/addon-contexts/react';
import {DocsPage, DocsContainer} from '@storybook/addon-docs/blocks';
import {themes} from '@storybook/theming';

import {contexts} from './contexts';

addDecorator(withContexts(contexts));
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    theme: themes.light,
  },
});
