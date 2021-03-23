import React from 'react';
import replyIcon from '../../../assets/architect/utils/images/icons/reply-icon.png';
import fordwardIcon from '../../../assets/architect/utils/images/icons/forward-icon.png';

const EmailButtons = () => {
  return (
    <div className="email-email-buttons">
      <img src={replyIcon} alt="" className="email-btns" />{' '}
      <img src={fordwardIcon} alt="" className="email-btns" />
    </div>
  );
};

export default EmailButtons;
