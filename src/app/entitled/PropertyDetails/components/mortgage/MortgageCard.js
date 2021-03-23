import React from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import MortgageContent from './MortgageContent';

const Content = styled.tbody`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  color: #393939;
`;

const MortgageCard = ({ dataMortgage }) => {
  return (
    <Table borderless responsive>
      <thead>
        <tr>
          <th>Property/Mortgage</th>
          <th>Sale Price/Mortgage</th>
          <th>Owners Insurance/Lenders</th>
          <th>Loan</th>
          <th>Policy</th>
        </tr>
      </thead>
      <Content>
        <MortgageContent dataMortgage={dataMortgage} />
      </Content>
    </Table>
  );
};

export default MortgageCard;
