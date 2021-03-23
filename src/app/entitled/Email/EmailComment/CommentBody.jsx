import React, { useState, useEffect } from 'react';
import {
  Container,
  CommentDiscussionButton,
  CommentBodyText,
  EmailButtonLink,
  SearchInputStyled
} from '../StyledComponents';
import {
  EmailAvatar,
  EmailSender,
  EmailMessage,
  IconContainer
} from '../EmailStyledComponents';
import { Col } from 'reactstrap';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons/Icon';
import { MentionsInput, Mention } from 'react-mentions';
import mentionStyles from './mentionStyles';
import config from '../../app/config/config';

const users = [
  {
    id: 'richard',
    display: 'Richard Primero'
  },
  {
    id: 'bryan',
    display: 'Bryan Hewitt'
  },
  {
    id: 'tom',
    display: 'Thomas Archer'
  }
];

const CommentBody = ({
  commentId,
  newCommentId,
  comment,
  handleUpdateComment,
  setNewCommentId,
  handleDeleteComment,
  handleNewComment,
  idx,
  isReply,
  addComment
}) => {
  const [editComment, setEditComment] = useState(false);
  const [openReplyInput, setOpenReplyInput] = useState(false);
  const [currentComment, setCurrentComment] = useState('');
  const [replyComment, setReplyComment] = useState('');

  const [newComment, setNewComment] = useState('');

  const isNewComment = commentId === newCommentId;
  const showEdit = editComment || isNewComment;

  // const toggleReply = () => {
  //   setOpenReplyInput(prevState => !prevState);
  // };

  const toggleEdit = () => {
    setEditComment(prevState => !prevState);
    setOpenReplyInput(false);
  };

  useEffect(() => {
    if (comment) {
      setCurrentComment(comment);
    }
  }, [comment]);

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleUpdateComment(commentId, currentComment);
      if (isNewComment) {
        handleNewComment(newComment);
      }
      setEditComment(false);
    }
  };

  const handleReply = () => {
    setOpenReplyInput(true);
    setEditComment(false);
    const replyTo = '@[Richard Primero](richard)';
    setReplyComment(replyTo);
  };

  return (
    <Container>
      <Col md={2}></Col>
      <Col md={10} className="p-0">
        {!showEdit && <EmailMessage>{currentComment}</EmailMessage>}

        {showEdit && (
          <MentionsInput
            markup="@[__display__](__id__)"
            value={currentComment}
            onChange={e => setCurrentComment(e.target.value)}
            onKeyPress={e => handleKeyPress(e)}
            onBlur={() => handleUpdateComment(commentId, currentComment)}
            className="email-reply-input"
          >
            <Mention trigger="@" data={users} style={mentionStyles} />
          </MentionsInput>
        )}
        {openReplyInput && (
          <MentionsInput
            markup="@[__display__](__id__)"
            value={replyComment}
            onChange={e => setReplyComment(e.target.value)}
            className="email-reply-input"
          >
            <Mention trigger="@" data={users} style={mentionStyles} />
          </MentionsInput>
        )}
      </Col>
      <Col md={4} className="align-right">
        {/* <CommentDiscussionButton>DISCUSSION</CommentDiscussionButton> */}
      </Col>
    </Container>
  );
};

export default CommentBody;
