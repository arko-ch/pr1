import React from 'react';
import { FooterContainer } from './StyledComponents';
import FooterButtons from './FooterButtons';
import AssignedText from './AssignedText';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';
import { Col } from 'reactstrap';
import DraggableViews from './DraggableViews';

const Footer = () => {
  return (
    <FooterContainer>
      <Col xs={12} md={6} className="p-0">
        <FooterButtons icon={Icons.faAnchor} />
        <DraggableViews />
        <FooterButtons icon={Icons.faLink} />
        <FooterButtons icon={Icons.faChartLine} />
        <AssignedText />
      </Col>
      <Col xs={12} md={6} className="p-0 align-right">
        <FontAwesomeIcon
          icon={Icons.faClone}
          className="ml-2 split-pane-footer-icons"
        />
        <FontAwesomeIcon
          icon={Icons.fasTools}
          className="ml-2 split-pane-footer-icons"
        />
        <FontAwesomeIcon
          icon={Icons.fasShapes}
          className="ml-2 split-pane-footer-icons"
        />
      </Col>
    </FooterContainer>
  );
};

export default Footer;
