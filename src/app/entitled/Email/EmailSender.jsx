import React, { useState, useEffect, useRef } from 'react';
import {
  EmailSender as Sender,
  NewImportant,
  NewMessageBadge
} from './EmailStyledComponents';
import EmailSenderCard from './EmailSenderCard';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';
import Moment from 'react-moment';

const EmailSender = ({ sender, date, isImportant, newMessage,messageitem }) => {

  const [openCard, setOpenCard] = useState(false);
  const handleOpenCard = e => {
    e.stopPropagation();
    setOpenCard(true);
  };

/*   useEffect(() => {
    console.log('emailsender props',messageitem);
  }, []); 
 */

  return (
    <Sender isOpen={openCard} >
      <a onClick={e => handleOpenCard(e)}>{sender} </a>
      <span>
      <Moment format= "D MMM YYYY" >
             {messageitem.receivedDateTime}
             </Moment>
        
        </span>
      {openCard && <EmailSenderCard setOpenCard={setOpenCard}  />}
      {newMessage && <NewMessageBadge>98</NewMessageBadge>}
      {isImportant && (
        <NewImportant>
          <FontAwesomeIcon icon={Icons.faBell} />
          New Important
        </NewImportant>
      )}
    </Sender>
  );
};

export default EmailSender;
