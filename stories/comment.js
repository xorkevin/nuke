import React from 'react';
import CommentSection from 'src/component/comment';
import {comments} from 'example/src/config';

export default {title: 'Comment section'};

export const plain = () => (
  <CommentSection comments={comments}></CommentSection>
);
