import React, { useState, useEffect } from 'react';
import { ObjectId } from 'bson';
import EmailMessageBox from './EmailMessageBox';
import EmailComment from './EmailComment';
import AttachmentList from './AttachmentList';
import EmailDiscussion from './EmailDiscussion';
import CommentInput from './EmailComment/CommentInput';
import config from '../app/config/config';

const MessageContainer = ({
  message,
  mailObject,
  mailId,
  toggleShowComment,
  showComment,
  idx,
  commentIndex,
  isOpen,
  handleReply,
  activeReply,
  activeReplyAll,
  handleReplyAll,
  isDropdownOpen,
  toggleDropdown,
  newInfoData
}) => {
  const [comments, setComments] = useState([]);
  const [dummyComments, setDummyComments] = useState([]);
  const [newCommentId, setNewCommentId] = useState('');

  const [addNewComment, setAddNewComment] = useState(false);

  useEffect(() => {
    if (mailId) {
      handleFetchData();
    }
  }, [mailId]);
  //newInfoData

 /*  useEffect(() => {
   console.log('newInfoData')
  }, []); */

  const handleFetchData = async () => {
    try {
      const res = await fetch(
        config.returnEnv() + `mailcomments?mailId=` + mailId
      );

      const tempComments = await res.json();
      const filteredComments = tempComments.filter(x => x.comment !== '');

      setComments(filteredComments);
    } catch (err) {
      console.error('error >', err);
    }
  };

  const showCommentSection = showComment && commentIndex === idx;

  const handleUpdateComment = async (id, value) => {
    try {
      const res = await fetch(config.returnEnv() + 'mailcomments/' + id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment: value,
          user: JSON.parse(sessionStorage.getItem('settlement-app-client')).user
            .data.user.name
        })
      });
    } catch (err) {
      console.error('error >', err);
    }

    setAddNewComment(false);
  };

  const handleNewComment = async comment => {
    
    const id = new ObjectId();
    const username= JSON.parse(sessionStorage.getItem('settlement-app-client'))
    const author=username.user.data.user.name
    //alert('messagecontainer HandleNewComment')
   // console.log('usernamesessionstorage',author)

    const tempComment = { _id: id.toString(), mailId, comment,  user:author, createdAt:new Date()};
    try {
      await fetch(config.returnEnv() + 'mailcomments', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tempComment)
      });
    } catch (err) {
      console.error('error >', err);
    }

    setComments([...comments, tempComment]);
    setAddNewComment(false);
    setNewCommentId(id.toString());
  };

  const handleDeleteComment = (id, idx) => {
    fetch(config.returnEnv() + 'mailcomments/' + id + '', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const tempComments = [...comments];
    tempComments.splice(idx, 1);
    setComments(tempComments);
  };

  return (
    <>
      <EmailMessageBox
        toggleDropdown={toggleDropdown}
        isDropdownOpen={isDropdownOpen}
        newInfoData={newInfoData}
        message={message}
        mailobject={mailObject}
        mailId={mailId}
        idx={idx}
        toggleShowComment={toggleShowComment}
        commentCount={comments.length}
        isOpen={isOpen}
        setAddNewComment={setAddNewComment}
        handleReply={handleReply}
        handleReplyAll={handleReplyAll}
        activeReply={activeReply}
        activeReplyAll={activeReplyAll}
      >
        {mailObject.hasAttachments ? (
          <AttachmentList message={mailObject} />
        ) : null}
      </EmailMessageBox>
      {/* <EmailDiscussion /> */}
      {addNewComment && (
        <CommentInput
          isNew
          setAddNewComment={setAddNewComment}
          handleNewComment={handleNewComment}
        />
      )}
      {showCommentSection && (
        <EmailComment
          addNewComment={addNewComment}
          setAddNewComment={setAddNewComment}
          comments={comments}
          handleNewComment={handleNewComment}
          handleUpdateComment={handleUpdateComment}
          newCommentId={newCommentId}
          setNewCommentId={setNewCommentId}
          handleDeleteComment={handleDeleteComment}
          setDummyComments={setDummyComments}
          dummyComments={dummyComments}
        />
      )}
    </>
  );
};

export default MessageContainer;
