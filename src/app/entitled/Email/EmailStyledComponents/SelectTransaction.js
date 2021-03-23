import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 15px;
`;

export const StyledSearchItemsContainer = styled.div`
  padding-top: 10px;
`;
export const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledInput = styled.input`
  background: #ffffff;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  border-radius: 6px;
  width: 100%;
  padding: 10px;
`;

export const StyledHeader = styled.h4`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #393939;
`;

export const StyledHeaderTwo = styled.h4`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #307df6;
  cursor: pointer;
`;

export const StyledSpan = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #393939;
`;

export const StyledSearchResult = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e1e1e1;
  :hover {
    background: ${props => (props.isImportant ? '#E5F8F1' : '#f7f8fa')};
  }
`;

export const StyledCheckbox = styled.input`
  width: 20px;
  height: 20px;
`;

export const StyledTransactionType = styled.p`
  padding-left: 25px;
  padding-top: 5px;
`;

export const StyledResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledContainerButton = styled.span`
  background: #ffffff;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  margin-bottom: 10px;
`;

export const StyledCancelButton = styled.button`
  background: #ffffff;
  border: 1px solid #e1e1e1 !important;
  box-sizing: border-box;
  border-radius: 6px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #393939;
  padding: 10px 15px;
  margin-right: 5px;
`;

export const StyledApplyButton = styled.button`
  background: #307df6;
  border-radius: 6px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #ffffff;
  padding: 10px 15px;
`;

export const StyledFilterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #307df6;
  margin-top: 20px;
`;

export const StyledSearchResultHeader = styled.h5`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: #393939;
`;

export const StyledFilterButton = styled.button`
  background-color: transparent;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;
export const StyledFilterContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(63, 95, 145, 0.15);
  border-radius: 6px;
  padding: 20px;
`;

export const StyledFilterHeader = styled.h5`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #393939;
`;

export const StyledFilterHeaderTwo = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #393939;
`;

export const StyledLabel = styled.label`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  margin-left: 5px;
  color: #6d7082;
  cursor: pointer;
  padding-right: 5px;
`;

export const StyledResetButton = styled.button`
  background: #ffffff;
  border: 1px solid #aeaeae !important;
  box-sizing: border-box;
  border-radius: 6px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: #393939;
  padding: 10px 15px;
`;

export const StyledSearchButton = styled.button`
  background: #307df6;
  border-radius: 6px;
  font-family: Open Sans;
  font-style: normal;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 10px 15px;
`;

export const StyledFilterOptionsContainer = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
`;
