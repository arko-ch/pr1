import React from 'react';
import { Col } from 'reactstrap';
import {
  IconContainer,
  EmailAvatar,
  EmailSender,
  CommentSenderContainer
} from '../EmailStyledComponents';
import avatar1 from '../../../../assets/architect/utils/images/avatars/1.jpg';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons/Icon';

const DiscussionHeader = () => {
  return (
    <>
      <Col xs={12} md={1}></Col>
      <Col xs={12} md={8}>
        <CommentSenderContainer>
          <EmailAvatar src={avatar1} />
          <EmailSender md={4} className="ml-3">
            Darell Steward <span>27 Nov 2020</span>
          </EmailSender>
        </CommentSenderContainer>
      </Col>
      <Col xs={12} md={3} className="align-right">
        <div className="comment-icons">
          <IconContainer>
            <FontAwesomeIcon icon={Icons.faReply} />
          </IconContainer>
          <IconContainer>
            <FontAwesomeIcon icon={Icons.faComments} />
          </IconContainer>
        </div>
      </Col>
    </>
  );
};

export default DiscussionHeader;
