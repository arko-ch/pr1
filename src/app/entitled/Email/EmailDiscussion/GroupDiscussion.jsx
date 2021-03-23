import React from 'react';
import GroupDiscussionHeader from './GroupDiscussionHeader';
import GroupDiscussionBody from './GroupDiscussionBody';
import { CommentItemContainer } from '../EmailStyledComponents';

const Thread = () => {
  return (
    <CommentItemContainer>
      <GroupDiscussionHeader />
      <GroupDiscussionBody />
    </CommentItemContainer>
  );
};
export default Thread;
