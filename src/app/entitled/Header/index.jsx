import React from 'react';
import {
  HeaderContainer,
  CompanyLogo,
  IconContainer,
  NewMessageBadge
} from './StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';
import { Col } from 'reactstrap';

const Header = () => {
  return (
    <HeaderContainer>
      <Col xs={12} md={6} className="p-0">
        <CompanyLogo>entitled</CompanyLogo>
      </Col>
      <Col xs={12} md={6} className="p-0 align-right">
        <IconContainer>
          <FontAwesomeIcon icon={Icons.faEnvelope} />
          <NewMessageBadge>6</NewMessageBadge>
        </IconContainer>
        <IconContainer>
          <FontAwesomeIcon icon={Icons.faSearch} />
        </IconContainer>
        <IconContainer>
          <FontAwesomeIcon icon={Icons.faExpand} />
        </IconContainer>
        <IconContainer>
          <FontAwesomeIcon icon={Icons.faSignInAlt} />
        </IconContainer>
      </Col>
    </HeaderContainer>
  );
};

export default Header;
