import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 20px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px 10px;
`;

const TransactionDropdown = styled.select`
  background: #ffffff;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 6px;
  width: auto;
  padding: 5px;
  border: none;
`;

const FirstContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 100%;
  justify-content: space-evenly;
`;

const DateContainer = styled.input`
  background: #ffffff;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 6px;
  width: auto;
`;

const SecondContainer = styled(FirstContainer)`
  margin-top: 10px;
`;

const Text = styled.div`
  color: #393939;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
`;

const TransactionSales = ({ dataTransaction }) => {
  const [editing, setEditing] = useState(false);

  const toggle = () => setEditing(!editing);

  const renderedData = dataTransaction.map(data => {
    return (
      <Fragment key={data.rowId}>
        <Container>
          <FirstContainer onClick={toggle}>
            {editing ? (
              <TransactionDropdown>
                <option>Deposit</option>
              </TransactionDropdown>
            ) : (
              <span>{data.instrument}</span>
            )}
            {editing ? (
              <TransactionDropdown>
                <option>PaperCheck</option>
              </TransactionDropdown>
            ) : (
              <span>{data.type}</span>
            )}
            <Text>being held up</Text>
            {editing ? (
              <TransactionDropdown>
                <option>Realtor</option>
              </TransactionDropdown>
            ) : (
              <span>{data.payor}</span>
            )}
            <Text>as of</Text>
            {editing ? (
              <DateContainer type="date" />
            ) : (
              <span>{data.exporteddate}</span>
            )}
          </FirstContainer>

          <SecondContainer>
            <Text>From</Text>
            <TransactionDropdown>
              <option>Select</option>
            </TransactionDropdown>
            <Text>and will be given to </Text>
            {editing ? (
              <TransactionDropdown>
                <option>Seller Attorney</option>
              </TransactionDropdown>
            ) : (
              <span>{data.selected}</span>
            )}
            <Text>on</Text>
            {editing ? (
              <DateContainer type="date" />
            ) : (
              <span>{data.cleareddate}</span>
            )}
          </SecondContainer>
        </Container>
      </Fragment>
    );
  });

  return <Fragment>{renderedData}</Fragment>;
};

export default TransactionSales;
