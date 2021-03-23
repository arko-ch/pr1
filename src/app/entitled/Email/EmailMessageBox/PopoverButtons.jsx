import React, { useState } from 'react';
import { PopoverButton, ButtonPopoverContainer } from '../StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';
const PopOverButtons = () => {
  const [state, setState] = useState({ first: false, second: false });

  return (
    <>
      <PopoverButton
        onMouseEnter={() => setState({ ...state, first: true, second: false })}
        onMouseLeave={() => setState({ ...state, first: false })}
      >
        This email
        <FontAwesomeIcon
          className="email-angle-right"
          icon={Icons.faAngleRight}
        />
        {state.first && (
          <ButtonPopoverContainer>
            <PopoverButton>Searches</PopoverButton>
            <PopoverButton>Commitment</PopoverButton>
            <PopoverButton>Invoices</PopoverButton>
            <PopoverButton>Policy</PopoverButton>
            <PopoverButton>Other</PopoverButton>
          </ButtonPopoverContainer>
        )}
      </PopoverButton>
      <PopoverButton
        onMouseEnter={() => setState({ ...state, second: true, first: false })}
        onMouseLeave={() => setState({ ...state, second: false })}
      >
        Full email thread
        <FontAwesomeIcon
          className="email-angle-right"
          icon={Icons.faAngleRight}
        />
        {state.second && (
          <ButtonPopoverContainer>
            <PopoverButton>Searches</PopoverButton>
            <PopoverButton>Commitment</PopoverButton>
            <PopoverButton>Payoffs and Invoices</PopoverButton>
            <PopoverButton>Policy</PopoverButton>
            <PopoverButton>Other</PopoverButton>
          </ButtonPopoverContainer>
        )}
      </PopoverButton>
    </>
  );
};

export default PopOverButtons;
