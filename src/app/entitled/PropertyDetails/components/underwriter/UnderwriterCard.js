import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import { Library as Icons, FontAwesomeIcon } from '../../../app/icons/Icon';

const Container = styled.div`
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(105, 105, 105, 0.2);
  box-sizing: border-box;
  border-radius: 8px;
`;

const CardTitle = styled.thead`
  color: #696969;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
`;

const CardContent = styled.tbody`
  font-weight: 500;
  font-size: 16px;
  color: #393939;
  text-align: center;
`;

const SelectTransaction = styled.select`
  background: rgba(247, 194, 68, 0.3);
  border-radius: 7px;
  border: none;
  color: #c1952b;
`;

const UnderwriterCard = ({ dataUnderwriter }) => {
  const listedData = dataUnderwriter.map(data => (
    <tr key={data.rowId}>
      <td>{data.underwriter}</td>
      <td>{data.commitmentIssued}</td>
      <td>{data.policyIssued}</td>
      <td>{data.remitted}</td>
      <td>{data.titleBill}</td>
    </tr>
  ));

  return (
    <Fragment>
      <Container>
        <SelectTransaction>
          <option>Pending Deal</option>
          <option>Active Deal</option>
        </SelectTransaction>
        <Table borderless responsive>
          <CardTitle>
            <tr>
              <th>Underwriter</th>
              <th>Commitment Issued</th>
              <th>Policy Issued</th>
              <th>Remitted </th>
              <th>
                Title Bill
                <FontAwesomeIcon icon={Icons.faExternalLinkSquareAlt} />
              </th>
            </tr>
          </CardTitle>
          <CardContent>{listedData}</CardContent>
        </Table>
      </Container>
    </Fragment>
  );
};

export default UnderwriterCard;
