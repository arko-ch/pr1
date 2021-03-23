import React from 'react';
import { Library as Icons, FontAwesomeIcon } from '../app/icons/Icon';
import styled from 'styled-components';

const StyledReassignHeader = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
`;
const ReassignToast = () => {
  return (
    <>
      <StyledReassignHeader>All Information</StyledReassignHeader>
      <span>
        All files in this email chain will be re-assigned to your new
        selection(s).
      </span>
    </>
  );
};

export default ReassignToast;
