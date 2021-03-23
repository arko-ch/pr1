import React from 'react';
import { CommentContainer } from '../StyledComponents';
import { CommentItemContainer } from '../EmailStyledComponents';
import CommentBody from './CommentBody';
import CommentHeader from './CommentHeader';
import CommentInput from './CommentInput';
import Comment from './Comment';
import EmailDiscussion from '../EmailDiscussion';

const EmailComment = ({
  comments,
  handleUpdateComment,
  newCommentId,
  handleNewComment,
  setNewCommentId,
  handleDeleteComment,
  addComment,
  setAddNewComment,
  addNewComment,
  dummyComments,
  setDummyComments
}) => {
  //console.log('comments array >', comments);
  return (
    <CommentContainer>
      {/* {addNewComment && (
        <CommentInput
          isNew
          setAddNewComment={setAddNewComment}
          handleNewComment={handleNewComment}
        />
      )} */}
      {comments.map((x, idx) => {
        return (
          <Comment
            comments={comments}
            commentId={x._id}
            comment={x.comment}
            setAddNewComment={setAddNewComment}
            handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
            idx={idx}
          />
        );
      })}

      <EmailDiscussion />

      {/* {comments.map((x, idx) => {
        return (
          <>
            <CommentItemContainer>
              <CommentHeader />
              <CommentBody
                commentId={x._id}
                comment={x.comment}
                handleUpdateComment={handleUpdateComment}
                newCommentId={newCommentId}
                setNewCommentId={setNewCommentId}
                handleDeleteComment={handleDeleteComment}
                handleNewComment={handleNewComment}
                addComment={addComment}
                setAddNewComment={setAddNewComment}
                idx={idx}
              />
            </CommentItemContainer>
            <EmailDiscussion />
          </>
        );
      })} */}
    </CommentContainer>
  );
};

export default EmailComment;
