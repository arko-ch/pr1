import React, { useState } from 'react';
import ReplyHeader from './ReplyHeader';
import { Container } from '../StyledComponents';
import {
  EmailMessage,
  CommentItemContainer,
  CommentReplyContainer
} from '../EmailStyledComponents';
import { Col } from 'reactstrap';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons/Icon';

const CommentReply = ({}) => {
  return (
    <CommentItemContainer>
      <ReplyHeader />
      <Container>
        <Col md={2}></Col>
        <Col md={10} className="p-0">
          <CommentReplyContainer>
            Yes I already started mine if you’d like to take a look
          </CommentReplyContainer>
        </Col>
      </Container>
    </CommentItemContainer>
  );
};

export default CommentReply;
