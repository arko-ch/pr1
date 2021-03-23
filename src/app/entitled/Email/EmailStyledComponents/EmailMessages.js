import styled from 'styled-components';
const defaultFontFamily = 'font-family:Open sans;';

export const SenderContainer = styled.div`
  display: flex;
`;

export const IconContainer = styled.button`
  background: ${props => (props.isOpen ? '#e2e6f0' : '#fff')};
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

export const EmailMessage = styled.div`
  color: #393939;
  font-style: normal;
  font-weight: ${props => (props.idx === 0 ? '600' : '400')};
  font-size: 14px;
`;

export const UploadIconContainer = styled.div`
  color: #307df6;
  font-size: 14px;
  padding: 8px 10px;
  background: #d6e5fd;
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

export const SaveLink = styled.button`
  background: transparent;
  color: #307df6;
  ${defaultFontFamily}
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  border: none;
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
  position: relative;

  span {
    font-size: 16px;
  }
`;

export const ButtonLink = styled.button`
  background: transparent;
  color: #307df6;
  ${defaultFontFamily}
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  border: none;
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
  position: relative;

  :hover {
    color: #6d7082;
  }
  :hover svg {
    color: #6d7082;
  }
`;

export const ButtonLinkRed = styled.button`
  background: transparent;
  color: #f63058;
  ${defaultFontFamily}
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  border: none;
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
  position: relative;

  :hover {
    color: #f63058;
  }
  :hover svg {
    color: #f63058;
  }
`;

export const Settlement = styled.div`
  background: #ffda96;
  padding: 2px 7px;
  border-radius: 1000px;
  color: #d18800;
  ${defaultFontFamily};
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  margin-left: 5px;
`;

export const CommentSenderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const IconPopoverContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(63, 95, 145, 0.15);
  border-radius: 6px;
  padding: 5px;
  width: 190px;
  position: absolute;
  left: 0;
  top: 30px;
  z-index: 6;
`;

export const IconPopoverButtons = styled.button`
  ${defaultFontFamily};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: ${props => (props.isDelete ? '#F63058' : '6d7082')};
  background: transparent;
  width: 100%;
  margin: 5px 0;
  padding: 5px;
  text-align: left;

  :hover {
    background: #f1f3f9;
    border-radius: 6px;
  }
`;

export const CommentItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  cursor: pointer;
  :hover {
    background: #eff1f5;
  }

  :hover .comment-icons {
    display: block;
  }

  .comment-icons {
    display: none;
  }
`;

export const CommentReplyContainer = styled.div`
  color: #393939;
  font-style: normal;
  font-weight: ${props => (props.idx === 0 ? '600' : '400')};
  font-size: 14px;
  margin-left: 8.5%;
`;

export const ThreadAvatar = styled.div`
  display: flex;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: #fff;
  justify-content: center;
  align-items: center;
  background: #307df6;
`;

export const NewImportant = styled.div`
  ${defaultFontFamily}
  margin-left: 5px;
  color: #fff;
  padding: 2px 5px;
  background: #00bf73;
  border-radius: 1000px;
  display: inline-flex;
  font-family: Open Sans;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

export const NewMessageBadge = styled.div`
  ${defaultFontFamily}
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  color: #ffffff;
  padding: 1px 7px;
  background: #307df6;
  border-radius: 100px;
  display: inline-flex;
  margin-left: 5px;
`;

export const CommentInput = styled.input`
  background: #ffffff;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px 7px;
  width: 100%;

  ${defaultFontFamily}
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #393939;

  ::placeholder {
    ${defaultFontFamily}
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #6d7082;
  }
`;

export const UploadItemsContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #ffffff !important;
  border: 1px solid #e1e1e1 !important;
  box-sizing: border-box !important;
  border-radius: 8px !important;
  ${defaultFontFamily}
  font-weight: 600 !important;
  font-size: 12px;
  overflow: hidden;
  position: relative;

  .upload-file-icons {
    display: none;
    position: absolute;
    right: 5px;
    top: 9px;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      266deg,
      rgba(255, 255, 255, 1) 94%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  :hover {
    .upload-file-icons {
      display: block;
    }
    box-shadow: 0px 4px 10px rgba(63, 95, 145, 0.15);
  }

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
