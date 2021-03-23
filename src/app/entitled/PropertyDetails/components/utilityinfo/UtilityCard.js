import React from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import UtilityContents from './UtilityContents';
import { Library as Icons, FontAwesomeIcon } from '../../../app/icons/Icon';

const Container = styled.div`
  margin-top: 20px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px;
`;

const Header = styled.tr`
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #393939;
  text-align: center;
`;

const UtilityCard = ({ dataUtility }) => {
  return (
    <Container>
      <Table borderless responsive>
        <thead>
          <Header>
            <th>Property</th>
            <th>
              <FontAwesomeIcon
                style={{ marginRight: '8px' }}
                icon={Icons.faTint}
              />
              Water
            </th>
            <th>
              <FontAwesomeIcon
                style={{ marginRight: '8px' }}
                icon={Icons.faToilet}
              />
              Sewer
            </th>
            <th>Final Readings</th>
            <th> F/R Party</th>
            <th>F/R Date</th>
          </Header>
        </thead>
        <tbody>
          <UtilityContents dataUtility={dataUtility} />
        </tbody>
      </Table>
    </Container>
  );
};

export default UtilityCard;
