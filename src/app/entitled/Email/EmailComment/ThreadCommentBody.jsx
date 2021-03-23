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
  idx,
  isReply
}) => {
  const [editComment, setEditComment] = useState(false);
  const [openReplyInput, setOpenReplyInput] = useState(false);
  const [currentComment, setCurrentComment] = useState('');
  const [replyComment, setReplyComment] = useState('');

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
        setNewCommentId('');
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
        <EmailMessage>
          Discussion was had about Screenshot approval of document file.pdf
        </EmailMessage>
      </Col>
      <Col md={4} className="align-right"></Col>
    </Container>
  );
};

export default CommentBody;
