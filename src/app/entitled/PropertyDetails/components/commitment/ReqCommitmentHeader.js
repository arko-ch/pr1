import React, { Fragment, useState } from 'react';
import RequirementCommitment from './RequirementCommitment';
import styled, { css } from 'styled-components';
import { Input, Table } from 'reactstrap';
import { Library as Icons, FontAwesomeIcon } from '../../../app/icons/Icon';

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const RequireButton = styled.button`
  background-color: #fff;
  border: none;
  border-radius: 6px;
  color: ${props => (props.primary ? '#307DF6' : '#656565')};
  font-weight: 500;
  font-size: 13px;
  margin-right: 20px;
`;

const Highlighted = styled.span`
  color: #393939;
  font-weight: bolder;

  ${props =>
    props.primary &&
    css`
      color: #307df6;
    `}
`;

const Header = styled.thead`
  color: #696969;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  text-align: center;
`;

const ReqCommitmentHeader = ({ dataReqCommitment, tableClass }) => {
  return (
    <Fragment>
      <Table
        responsive
        className={'requirement-table align-middle mb-0 ' + tableClass}
        hover
        borderless
        striped
      >
        <Header>
          <tr>
            <th>Property</th>
            <th>#</th>
            <th>Details</th>
            <th>Code</th>
            <th>Instrument</th>
            <th>OL/LP?</th>
            <th>Status</th>
          </tr>
        </Header>
        <tbody>
          <RequirementCommitment dataReqCommitment={dataReqCommitment} />
        </tbody>
      </Table>
      <Input
        type="search"
        placeholder="Search by Code, or the commitment/endorsement description"
      />
      <ButtonContainer>
        <RequireButton primary>
          <FontAwesomeIcon icon={Icons.faPlusCircle} />
        </RequireButton>
        <RequireButton>
          Show all <Highlighted>resolved</Highlighted>{' '}
          <Highlighted primary>2</Highlighted>
        </RequireButton>
        <RequireButton>
          Show all <Highlighted>omitted</Highlighted>{' '}
          <Highlighted primary>3</Highlighted>
        </RequireButton>
        <RequireButton>
          Show all <Highlighted>deleted</Highlighted>{' '}
          <Highlighted primary>2</Highlighted>
        </RequireButton>
      </ButtonContainer>
    </Fragment>
  );
};

export default ReqCommitmentHeader;
