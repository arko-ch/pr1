import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'reactstrap';
import {
  EmailPopoverContainer,
  EmailAvatar,
  EmailSender,
  EmailButtonLink,
  CardPhoneNumber,
  PrimaryContactAvatar,
  NotesContainer,
  OutlineButton
} from './EmailStyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';
import { avatar } from './helpers';

const EmailSenderCard = ({ setOpenCard }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenCard(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <EmailPopoverContainer ref={wrapperRef}>
      <Row className="w-100">
        <EmailAvatar src={avatar} />
        <Col>
          <EmailSender>Bryan Hewitt</EmailSender>
          <EmailButtonLink>
            Bryan1823@gmail.com
            <FontAwesomeIcon icon={Icons.faCopy} className="ml-1" />
          </EmailButtonLink>
        </Col>
      </Row>
      <Row className="w-100 mt-2">
        <CardPhoneNumber>Phone number</CardPhoneNumber>
        <CardPhoneNumber>
          <span> (322) 473 33 21 (122) 122 37 31</span>
        </CardPhoneNumber>
      </Row>
      <Row className="w-100 mt-2">
        <CardPhoneNumber>Primary Contact</CardPhoneNumber>
        <CardPhoneNumber>
          <PrimaryContactAvatar src={avatar} /> <span>Cody Fisher</span>
        </CardPhoneNumber>
      </Row>

      <Row className="w-100 mt-2">
        <CardPhoneNumber>Notes</CardPhoneNumber>
        <NotesContainer>
          Usually easier to reach Bryan through his secretary.
        </NotesContainer>
      </Row>

      <Row className="w-100 mt-2">
        <OutlineButton>View full card</OutlineButton>
      </Row>
    </EmailPopoverContainer>
  );
};

export default EmailSenderCard;
