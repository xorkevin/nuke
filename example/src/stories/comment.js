import React, {Fragment} from 'react';

import {Story} from 'docs';

import CommentSection from '@xorkevin/nuke/src/component/comment';
import {comments} from 'config';

const Stories = () => (
  <Fragment>
    <h1>Comments</h1>
    <hr />
    <p>
      <code>CommentSection</code> is used to display comment threads.
    </p>
    <Story>
      <CommentSection comments={comments}></CommentSection>
    </Story>
  </Fragment>
);

export default Stories;
