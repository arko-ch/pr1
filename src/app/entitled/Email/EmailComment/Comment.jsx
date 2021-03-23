import React, { useState } from 'react';
import { EmailMessage, CommentItemContainer } from '../EmailStyledComponents';
import CommentHeader from './CommentHeader';
import CommentInput from './CommentInput';
import { Col } from 'reactstrap';

const Comment = ({
  commentId,
  comment,
  idx,
  setAddNewComment,
  handleUpdateComment,
  handleDeleteComment,
  comments
}) => {
  const [editMode, setEditMode] = useState(false);
  const [currentComment, setCurrentComment] = useState(comment);
  const handleUpdate = (id, comment) => {
    setCurrentComment(comment);
    handleUpdateComment(id, comment);
    setEditMode(false);
  };
  const handleDelete = (id, idx) => {
    handleDeleteComment(id, idx);
    setEditMode(false);
  };
//console.log('comment.jsx',comments)
  return (
    <CommentItemContainer>
      {!editMode && <CommentHeader author={comments} idx={idx} setEditMode={setEditMode} />}
      <Col xs={12} md={2}></Col>
      <Col xs={12} md={10} className="p-0">
        {!editMode && <EmailMessage>{currentComment}</EmailMessage>}
      </Col>
      {editMode && (
        <CommentInput
          value={currentComment || comment}
          isEdit={editMode}
          commentId={commentId}
          handleUpdateComment={handleUpdate}
          setAddNewComment={setAddNewComment}
          idx={idx}
          handleDeleteComment={handleDelete}
        />
      )}
    </CommentItemContainer>
  );
};

export default Comment;
