import React, { Fragment } from 'react';
import Page from '../ui/Page';
import { Button, Row, Col, Card, CardBody } from 'reactstrap';

import CurrentProperties from './CurrentProperties';
import TodoList from './TodoList';
import RecentActivity from './RecentActivity';
import TransferStageAnalysis from './TransferStageAnalysis';
////strapiV3
export default function() {
  return (
    <Page
      icon="pe-7s-note"
      welcome={{
        title: 'Properties',
        message: 'Dashboard'
      }}
    >
      <Fragment>
        <Row>
          <Col>
            <CurrentProperties />
          </Col>
        </Row>
        <Row>
          <Col>
            <RecentActivity />
          </Col>
          <Col>
            <TodoList />
          </Col>
        </Row>
        <Row>
          <Col>
            <TransferStageAnalysis />
          </Col>
        </Row>
      </Fragment>
    </Page>
  );
}
