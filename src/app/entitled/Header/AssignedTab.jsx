import React from 'react';
import { Library as Icons, FontAwesomeIcon } from '../app/icons/Icon';
import {
  StyledDiv,
  StyledContainerProperty,
  StyledDivIcon,
  StyledPropertyDiv
} from './StyledComponents';

const AssignedTab = () => {
  return (
    <>
      <StyledDiv>
        <StyledContainerProperty>
          <StyledDivIcon>
            <FontAwesomeIcon icon={Icons.faBorderAll} />
          </StyledDivIcon>
          <StyledPropertyDiv>
            <span style={{ color: '#6C30F6', marginRight: '2px' }}>
              <FontAwesomeIcon icon={Icons.faHome} />
            </span>
            St. Utica, Pennsylvania...
          </StyledPropertyDiv>
          <StyledPropertyDiv primary>
            <span style={{ color: '#FFA600' }}>
              <FontAwesomeIcon icon={Icons.faBolt} />
            </span>
            <span style={{ marginLeft: '3px' }}>
              8502 Preston Rd. Inglewood
            </span>
          </StyledPropertyDiv>
          <StyledPropertyDiv primary>
            <span style={{ color: '#FFA600' }}>
              <FontAwesomeIcon icon={Icons.faBolt} />
            </span>
            <span style={{ marginLeft: '3px' }}>
              Dr. San Jose, South Dakota 83475
            </span>
          </StyledPropertyDiv>
          <StyledDivIcon>
            <FontAwesomeIcon icon={Icons.faPlus} />
          </StyledDivIcon>
        </StyledContainerProperty>
      </StyledDiv>
    </>
  );
};

export default AssignedTab;
