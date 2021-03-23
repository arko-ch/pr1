import React from 'react';
import { Col } from 'reactstrap';
import {
  IconContainer,
  CommentAvatar,
  EmailSender,
  CommentSenderContainer
} from '../EmailStyledComponents';
import avatar1 from '../../../../assets/architect/utils/images/avatars/1.jpg';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons/Icon';
const DiscussonReplyHeader = () => {
  return (
    <>
      <Col xs={12} md={2}></Col>
      <Col xs={12} md={10}>
        <CommentSenderContainer>
          <CommentAvatar src={avatar1} />
          <EmailSender md={4} className="ml-3">
            Daniel Lin <span>26 Nov 2020</span>
          </EmailSender>
        </CommentSenderContainer>
      </Col>
    </>
  );
};

export default DiscussonReplyHeader;
