import React, { useState, useEffect, useRef } from 'react';
import { EmailMessageBoxSender } from '../StyledComponents';
import {
  EmailSender,
  SenderContainer,
  Settlement
} from '../EmailStyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';
import Moment from 'react-moment';
const Sender = ({ sender, thismessageitem }) => {

  useEffect(() => {
  //  console.log('emailsender props',thismessageitem);
  }, []); 

  return (
    <SenderContainer>
      <EmailSender>
        {sender || 'sender@gmail.com'}
        <span>
        <Moment format= "D MMM YYYY" >
          {thismessageitem.receivedDateTime} 
             </Moment>

        </span>
      </EmailSender>
      <Settlement>Settlement</Settlement>
    </SenderContainer>
  );
};
export default Sender;
