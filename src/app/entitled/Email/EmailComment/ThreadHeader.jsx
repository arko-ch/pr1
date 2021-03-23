import React from 'react';
import { Col } from 'reactstrap';
import {
  IconContainer,
  EmailSender,
  CommentSenderContainer,
  ThreadAvatar
} from '../EmailStyledComponents';
import avatar1 from '../../../../assets/architect/utils/images/avatars/1.jpg';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons/Icon';
const ThreadHeader = () => {
  return (
    <>
      <Col xs={12} md={1}></Col>
      <Col xs={12} md={8}>
        <CommentSenderContainer>
          <ThreadAvatar>
            <FontAwesomeIcon icon={Icons.faComments} />
          </ThreadAvatar>
          <EmailSender md={4} className="ml-3">
            Darrell Steward and Daniel Lin <span>27 Nov 2020</span>
          </EmailSender>
        </CommentSenderContainer>
      </Col>
      <Col xs={12} md={3} className="align-right">
        <div className="comment-icons">
          <IconContainer>
            <FontAwesomeIcon icon={Icons.faEye} />
          </IconContainer>
        </div>
      </Col>
    </>
  );
};

export default ThreadHeader;
