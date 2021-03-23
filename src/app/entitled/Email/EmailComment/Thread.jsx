import React from 'react';
import ThreadHeader from './ThreadHeader';
import ThreadCommentBody from './ThreadCommentBody';
import { CommentItemContainer } from '../EmailStyledComponents';

const Thread = () => {
  return (
    <CommentItemContainer>
      <ThreadHeader />
      <ThreadCommentBody />
    </CommentItemContainer>
  );
};
export default Thread;
