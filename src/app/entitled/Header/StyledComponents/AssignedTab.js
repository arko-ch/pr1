import styled from 'styled-components';

export const StyledDiv = styled.div`
  background: #ffffff;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

export const StyledContainerProperty = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const StyledDivIcon = styled.div`
  background: #f1f3f9;
  border-radius: 6px;
  margin-right: 10px;
  padding: 5px 10px;
`;

export const StyledPropertyDiv = styled.div`
  background: ${props => (props.primary ? '#ffff' : '#e6ebfe')};
  border-radius: 6px;
  padding: 5px;
  margin-right: 5px;
  font-family: Open sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
`;
