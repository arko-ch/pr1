import React from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import HoaContents from './HoaContents';

const Container = styled.div`
  margin-top: 20px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px;
`;

const Header = styled.tr`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #393939;
`;

const HoaCard = ({ dataHoa }) => {
  return (
    <Container>
      <Table borderless responsive>
        <thead>
          <Header>
            <th>Property</th>
            <th>Start Up Fee</th>
            <th>Regular Dues</th>
            <th>Transfer Fees</th>
            <th> Document Fees</th>
            <th>Processing Fees</th>
            <th>Total HOA</th>
          </Header>
        </thead>
        <tbody>
          <HoaContents dataHoa={dataHoa} />
        </tbody>
      </Table>
    </Container>
  );
};

export default HoaCard;
