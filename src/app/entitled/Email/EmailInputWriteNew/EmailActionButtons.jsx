import React from 'react';
import { Col } from 'reactstrap';
import {
  EmailActionButtonsContainer,
  EmailActionButton,
  EmailSendButton,
  EmailInvertSendButton
} from '../StyledComponents';
import BellRingIcon from './BellRingIcon';
const axios = require('axios');
const EmailActionButtons = state => {
  /* let sikret;
  sikret = encodeURIComponent('RY0ljep6ogy6ouKE4REJMxLCC9oxgJ1iolX3/++LNro=');
  axios.post(`https://cors-anywhere.herokuapp.com/https://login.microsoftonline.com/9f066f72-168e-4bdb-b544-a622c6a188e0/oauth2/token`,`grant_type=client_credentials&client_id=7d3aad3c-cdc9-4332-ba51-116a76cb0609&client_secret=${sikret}&resource=https://graph.microsoft.com`
    )

    .then(res => localStorage.setItem('access_token', res.data.access_token))
    .catch(error => {
      console.error(error.response);
    });
 */
  //let toke =localStorage.getItem('access_token')

  const reply = async () => {
    alert('write new actionbutton')
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Access-Control-Allow-Origin': '*'
      }
    };
    let msgbody = {
      comment: state.data.textarea,
      content: 'Text',
      attachments: [
        {
          '@odata.type': '#microsoft.graph.fileAttachment',
          name: 'attachment.txt',
          contentType: 'text/plain',
          contentBytes: 'SGVsbG8gV29ybGQh'
        }
      ]
    };
    console.log('msgbody', msgbody);
    axios
      .post(
        `https://graph.microsoft.com/v1.0/users/slsdev@settlementapp99.com/messages/${state.data.mailid}/reply`,
        msgbody,
        axiosConfig
      )
      .then(res => {
        console.log('Response Received:', res);
      })
      .catch(err => {
        console.log('AXIOS error:', err);
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
          Send write new
        </EmailInvertSendButton>
        <EmailSendButton onClick={reply}>Send---</EmailSendButton>
      </Col>
    </EmailActionButtonsContainer>
  );
};

export default EmailActionButtons;
