import React from 'react';
import { AssignedTextContainer } from './StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';

const AssignedText = () => {
  return (
    <AssignedTextContainer>
      <FontAwesomeIcon
        icon={Icons.fasFireAlt}
        className="mr-2 footer-assigned-icon"
      />
      Bryan assigned an email <br /> in 234 Main Street
    </AssignedTextContainer>
  );
};

export default AssignedText;
