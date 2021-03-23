import React, { useState } from 'react';
import { Col } from 'reactstrap';
import {
  IconContainer,
  EmailAvatar,
  EmailSender,
  CommentSenderContainer
} from '../EmailStyledComponents';
import avatar1 from '../../../../assets/architect/utils/images/avatars/1.jpg';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons/Icon';
import { Tooltip } from 'reactstrap';
import Moment from 'react-moment';
const CommentHeader = ({ idx, setEditMode,author }) => {
  const username = JSON.parse(sessionStorage.getItem('settlement-app-client'));
  const authorUsername =username.user.data.user.name
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const [chat, setChat] = useState(false);
  const [isAuthor, setIsAuthor]= useState(false)
  const toggleEdit = () => {
    if 
    (authorUsername !== author[0].user) 
    {
      setIsAuthor(true)}      
      else {
        setIsAuthor(false)
        setEdit(!edit)
      }
  };
  const toggleReply = () => setReply(!reply);
  const toggleChat = () => setChat(!chat);
 // console.log('author',author[0].user)
  
 // console.log('username in local storage',username.user.data.user)
  return (
    <>
      <Col xs={12} md={1}></Col>
      <Col xs={12} md={8}>
        <CommentSenderContainer>
          <EmailAvatar src={avatar1} />
          <EmailSender md={4} className="ml-3">
           {/*  Adam smith <span>27 Nov 2020</span> */}
           {author[0].user} <span>
            
             <Moment format= "D MMM YYYY" >
             {author[0].createdAt}
             </Moment>
             </span> 
          
          </EmailSender>
        </CommentSenderContainer>
      </Col>
      <Col xs={12} md={3} className="align-right">
        <div className="comment-icons">
          {isAuthor
          ?
          <IconContainer id={`comment-edit-icon-${idx}`}  onClick={() => setEditMode(true)}>
          <FontAwesomeIcon icon={Icons.faPen} />
          </IconContainer>
          :
          <IconContainer id={`comment-edit-icon-${idx}`}  >
          <FontAwesomeIcon icon={Icons.faPen} />
          </IconContainer>}

          <IconContainer id={`comment-reply-icon-${idx}`}>
            <FontAwesomeIcon icon={Icons.faReply} />
          </IconContainer>
          <IconContainer id={`comment-chat-icon-${idx}`}>
            <FontAwesomeIcon icon={Icons.faComments} />
          </IconContainer>

          <Tooltip
            placement="top"
            isOpen={edit}
            target={`comment-edit-icon-${idx}`}
            toggle={toggleEdit}
          >
            {isAuthor
          ?
            'Edit'
            :'Author Only'}
          </Tooltip>

          <Tooltip
            placement="top"
            isOpen={reply}
            target={`comment-reply-icon-${idx}`}
            toggle={toggleReply}
          >
            Reply
          </Tooltip>

          <Tooltip
            placement="top"
            isOpen={chat}
            target={`comment-chat-icon-${idx}`}
            toggle={toggleChat}
          >
            Chat
          </Tooltip>
        </div>
      </Col>
    </>
  );
};

export default CommentHeader;
