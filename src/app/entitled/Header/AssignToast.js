import React from 'react';
import { Library as Icons, FontAwesomeIcon } from '../app/icons/Icon';
import styled from 'styled-components';

const StyledToastDiv = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
`;
const AssignToast = ({ label }) => {
  return (
    <>
      <StyledToastDiv>
        <span style={{ marginRight: '5px' }}>
          <FontAwesomeIcon icon={Icons.faCheckSquare} />
        </span>
        {label}
      </StyledToastDiv>
    </>
  );
};

export default AssignToast;
