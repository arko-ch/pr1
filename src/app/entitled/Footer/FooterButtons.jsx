import React from 'react';
import { FooterButtons } from './StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';

const FooterButton = ({ icon, label, active }) => {
  return (
    <FooterButtons className={`mr-1 ${active && 'active'}`}>
      <FontAwesomeIcon icon={icon} className={label ? 'mr-1' : ''} />
      {label}
    </FooterButtons>
  );
};

export default FooterButton;
