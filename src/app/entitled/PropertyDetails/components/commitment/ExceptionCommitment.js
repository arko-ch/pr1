import React, { Fragment } from 'react';
import { Input, Table } from 'reactstrap';
import styled, { css } from 'styled-components';

const Header = styled.thead`
  color: #696969;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  text-align: center;
`;

const PropertySelect = styled.select`
  background: #f6f6f6;
  border-radius: 5px;
  border: none;
  width: auto;
  padding: 5px 10px;
`;

const PropertyRow = styled.tr`
  font-weight: 500;
  font-size: 13px;
  color: #393939;
  text-align: center;
`;

const ExceptionCommitment = ({ dataExcsCommitment, tableClass }) => {
  const renderedData = dataExcsCommitment.map((data, index) => (
    <Fragment key={index}>
      <PropertyRow>
        <td>
          <PropertySelect>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </PropertySelect>
        </td>
        <td>10</td>
        <td>{data.details}</td>
        <td>{data.code}</td>
        <td>{data.instrument}</td>
        <td>{data.oplp}</td>
        <td>{data.note}</td>
      </PropertyRow>
      <tr className={'editing explanation easyTr'}>
        <td className={'easyDesc' ? ' col02' : 'col02'} colSpan="10">
          <span>{data.easyDesc}</span>
        </td>
      </tr>
      <tr className={'editing explanation detailedTr'}>
        <td className={'detailDesc' ? ' col02' : 'col02'} colSpan="10">
          <span>{data.detailDesc}</span>
        </td>
      </tr>
    </Fragment>
  ));

  return (
    <Fragment>
      <Table
        responsive
        className={'requirement-table align-middle mb-0 ' + tableClass}
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
        <tbody>{renderedData}</tbody>
      </Table>
    </Fragment>
  );
};

export default ExceptionCommitment;
