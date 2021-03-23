import React, { useEffect } from 'react';
import './AssignEmail.scss';
import { Row, Col } from 'reactstrap';
import Header from './assignemailheader/AssignEmailHeader';
import Tabs from './assignemailtabs/AssignEmailTabs';
import EmailArea from './assignemailarea/AssignEmailArea';
import $mailBox from './services/MailBox';

export default function() {
  useEffect(() => {
    $mailBox.refreshAccessToken();
    localStorage.clear();
  });
  return (
    <div className="main-container">
      <Row className="ZeroMargin">
        <Col md="12">
          <div>
            <Row>
              <Col sm="12" md="12" lg="12">
                <Header />
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="12" lg="12">
                <Tabs />
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="12" lg="12">
                <EmailArea />
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="12" lg="12">
                <Tabs />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
