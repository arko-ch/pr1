import React, { useState } from 'react';
import { LightBlueBUtton } from './StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';
import EmailInput from './EmailInput';
import { Collapse } from 'reactstrap';

const ReplyAll = ({ handleReplyAll, message, activeReplyAll }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => setToggle(!toggle);

  return (
    <>
      <LightBlueBUtton
        onClick={e => {
          handleReplyAll(message.conversationId);
          handleToggle();
        }}
        className="mr-2"
      >
        <FontAwesomeIcon
          icon={Icons.faReplyAll}
          size="sm"
          className="email-btns mr-2"
        />
        Reply All
      </LightBlueBUtton>

      <Collapse isOpen={activeReplyAll}>
        <EmailInput props={message} toggle={toggle} />
      </Collapse>
    </>
  );
};

export default ReplyAll;
