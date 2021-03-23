import React from 'react';
import { Col } from 'reactstrap';
import {
  EmailActionButtonsContainer,
  EmailActionButton,
  EmailSendButton,
  EmailInvertSendButton
} from '../StyledComponents';
import BellRingIcon from './BellRingIcon';
import mail from '../../services/Mail';
import Swal from 'sweetalert2';

const axios = require('axios');

const EmailActionButtonsNewMail = state => {
  const $mail = mail;

//  console.log('state', state);
  const sendNew = async () => {
    console.log('SENDNEW');
    let attachmentsfromstate = [];
    attachmentsfromstate = state.data.attachments; //[0]
    console.log('attachmentsfromstate ', attachmentsfromstate);
    let arraylenght = attachmentsfromstate.length;
    console.log('arraylenght', attachmentsfromstate, arraylenght);
    let files = 0;
    let attachmentsfromstatepost;
    while (files < arraylenght) {
      attachmentsfromstatepost = attachmentsfromstate[files];

      files++;
      console.log('message state', attachmentsfromstatepost);
    }
    let checkattach = state.data.attachments[0];

    const { to } = state.toNewEmail;
    const updatedEmailData = to.map(data => {
      state.data.to.push({
        emailAddress: {
          address: data
        }
      });
    });

    console.log('attachname', checkattach.name);

    console.log('send state', state);
    console.log('state.toNewEmail ->', state.toNewEmail);


    if (checkattach.name === '') {
      const res = await $mail.writenoattached({
        to: state.data.to,
        body: state.data.textarea,
        subject: state.data.subject,
        attachments: state.data.attachments
      });
    } else {
      const res = await $mail.write({
        to: state.data.to,
        body: state.data.textarea,
        subject: state.data.subject,
        attachments: state.data.attachments
      });

    }

    

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Email Successfully Sent',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <EmailActionButtonsContainer>
      <Col xs={12} md={8}>
        <EmailActionButton>Yes</EmailActionButton>
        <EmailActionButton>No</EmailActionButton>
        <EmailActionButton>Please follow up.</EmailActionButton>
        <EmailActionButton>Show More...</EmailActionButton>
      </Col>
      <Col xs={12} md={4} align="right">
        <EmailInvertSendButton>
          <BellRingIcon className="email-bell-ring-icon" />
          Send
        </EmailInvertSendButton>
        <EmailSendButton onClick={sendNew}>Send</EmailSendButton>
      </Col>
    </EmailActionButtonsContainer>
  );
};

export default EmailActionButtonsNewMail;
