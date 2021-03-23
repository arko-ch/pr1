import styled from 'styled-components';

const defaultFontFamily = 'font-family:Open sans';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 15px;
`;

export const CompanyLogo = styled.div`
  ${defaultFontFamily};
  color: #393939;
  font-weight: 700;
  display: inline-flex;
  font-size: 18px;
`;

export const IconContainer = styled.button`
  background: #fff;
  width: 32px;
  height: 32px;
  color: #6d7082;
  border: 1px solid #e1e1e1 !important;
  border-radius: 4px;
  margin-left: 5px;
  position: relative;
  :hover {
    background: #e2e6f0;
  }

  span {
    font-size: ${props => props.fontSize}px;
  }
`;

export const NewMessageBadge = styled.div`
  ${defaultFontFamily}
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  color: #ffffff;
  padding: 1px 7px;
  background: #307df6;
  border-radius: 100px;
  display: inline-flex;
  position: absolute;
  top: -7px;
  right: -4px;
`;

export const SearchIconContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: #fff;
  font-size: 16px;
`;

export const SearchInputContainer = styled.div`
  position: relative;
  display: inline-flex;
  margin-left: 106px;
`;

export const SearchInput = styled.input`
  ${defaultFontFamily};
  padding: 10px 10px 10px 30px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  color: #fff;
  min-width: 335px;
  ::placeholder {
    color: #fff;
    font-weight: 500;
    font-size: 14px;
  }
`;
