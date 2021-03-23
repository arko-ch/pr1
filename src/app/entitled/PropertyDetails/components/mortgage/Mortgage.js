import React from 'react';
import styled from 'styled-components';
import { Library as Icons, FontAwesomeIcon } from '../../../app/icons/Icon';
import MortgageCard from './MortgageCard';

const Container = styled.div`
  background: #ffffff;
  border: 1px solid rgba(105, 105, 105, 0.2);
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px 10px;
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: none;
  margin-bottom: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const AddButton = styled.button`
  color: #307df6;
  margin-right: 10px;
  border: none;
  background: #ffff;
  font-weight: 50px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 60%;
  align-items: center;
  flex-wrap: wrap;
`;

const IconButton = styled.button`
  padding: 5px 10px;
  background: ${props => (props.primary ? '#e3eaf7' : '#f6f6f6')};
  border: none;
`;

const Mortgage = ({ dataMortgage }) => {
  return (
    <Container>
      <ButtonContainer>
        <AddButton>
          <FontAwesomeIcon
            style={{ marginRight: '5px' }}
            icon={Icons.faPlusCircle}
          />
          Add Property
        </AddButton>
        <AddButton>
          <FontAwesomeIcon
            style={{ marginRight: '5px' }}
            icon={Icons.faPlusCircle}
          />
          Add Mortgage
        </AddButton>
        <IconContainer>
          <IconButton primary>
            <FontAwesomeIcon icon={Icons.faHouse} />
          </IconButton>
          <IconButton>
            <FontAwesomeIcon icon={Icons.faDollarSign} />
          </IconButton>
        </IconContainer>
      </ButtonContainer>

      <MortgageCard dataMortgage={dataMortgage} />
    </Container>
  );
};

export default Mortgage;
