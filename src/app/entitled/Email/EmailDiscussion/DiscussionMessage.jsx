import React from 'react';
import { EmailMessage, CommentItemContainer } from '../EmailStyledComponents';
import DiscussionHeader from './DiscussionHeader';
import { Col } from 'reactstrap';

const DiscussionMessage = () => {
  return (
    <CommentItemContainer>
      <DiscussionHeader />
      <Col xs={12} md={2}></Col>
      <Col xs={12} md={10} className="p-0">
        <EmailMessage>
          We have a winner: how does “Order confirmed. Beep boop.” sound to
          everyone?
        </EmailMessage>
      </Col>
    </CommentItemContainer>
  );
};

export default DiscussionMessage;
