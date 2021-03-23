import React, { useState } from 'react';

import EmailSenderName from './EmailSenderName';
import EmailTitle from './EmailTitle';
import EmailAvatarContainer from './EmailAvatarContainer';
import EmailAvatar from './EmailAvatar';
import EmailButtons from './EmailButtons';
import EmailTime from './EmailTime';
import EmailContentArea from './EmailContentArea';

const EmailItem = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { sender, title, avatars, hour, day } = email;

  return (
    <div className="email-item-container">
      <EmailSenderName name={sender} />
      <EmailTitle title={title} />
      <EmailAvatarContainer>
        {avatars.map((x, idx) => {
          return <EmailAvatar src={x.src} idx={idx} />;
        })}
      </EmailAvatarContainer>
      <EmailButtons />
      <EmailTime day={day} hour={hour} open={isOpen} setOpen={setIsOpen} />
      <EmailContentArea open={isOpen} />
    </div>
  );
};

export default EmailItem;
