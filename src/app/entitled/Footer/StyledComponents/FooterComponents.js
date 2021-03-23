import styled from 'styled-components';
const defaultFontFamily = 'font-family:Open sans';

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #e7e7e7;
  padding: 10px;
  width: 100%;
  background: #fff;
  margin-top: 30px;
  border-radius: 0 0 10px 10px;
`;

export const FooterButtons = styled.div`
  padding: 5px 8px;
  background: transparent;
  color: #393939;
  border: 1px solid #e7e7e7;
  border-radius: 6px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;

  &.active {
    background: #e7e7e7;
  }
`;

export const DraggableContainer = styled.div`
  display: inline-flex;
`;

export const FooterDroppableContainer = styled.div`
  display: inline-flex;
`;

export const AssignedTextContainer = styled.div`
  ${defaultFontFamily};
  font-size: 10px;
  font-weight: 500;
  color: #393939;
  display: inline-flex;
  align-items: center;
  margin-left: 16px;
`;
