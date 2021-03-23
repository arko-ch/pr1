import styled from 'styled-components';
const defaultFontFamily = 'font-family:Open sans;';

export const MessageItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${defaultFontFamily}
  padding:20px;
  border-bottom: 1px solid #e1e1e1;
  cursor: pointer;
  background: ${props => {
    if (props.isOpen) {
      return '#f7f8fa';
    }

    if (props.isImportant) {
      return '#ccf2e3';
    }

    if (props.newMessage) {
      return '#F7F8FA';
    }

    return '#fff';
  }};

  :hover {
    background: ${props => (props.isImportant ? '#E5F8F1' : '#f7f8fa')};
  }
`;

export const AvatarContainer = styled.div`
  display: inline-flex;
  position: relative;
`;

export const EmailAvatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

export const AvatarBadgeContainer = styled.div`
  color: #6c30f6;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background: #e6ebfe;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  position: absolute;
  bottom: -4px;
  left: -4px;
`;

export const EmailSender = styled.div`
  color: #393939;
  font-weight: bold;
  font-size: 14px;
  position: relative;

  a {
    color: ${props => (props.isOpen ? '#307DF6' : '#393939')}!important;
    font-weight: bold;
    font-size: 14px;
    position: relative;
  }

  span {
    margin-left: 5px;
    color: #6d7082;
    font-weight: 400 !important;
    font-size: 13px;
  }

  a:hover {
    color: #307df6 !important;
    border-bottom: 1px solid #307df6;
  }
`;

export const EmailMessageShort = styled.div`
  color: #393939;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const AttachedFiles = styled.div`
  color: #307df6;
  font-weight: 600;
  font-size: 14px;
`;

export const EmailPopoverContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(63, 95, 145, 0.15);
  border-radius: 6px;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 310px;
  position: absolute;
  left: -1px;
  top: 20px;
  z-index: 2;
`;

export const EmailButtonLink = styled.button`
  background: transparent;
  display: inline-flex;
  ${defaultFontFamily}
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #307df6;
  display: flex;
  align-items: center;
  padding: 0;
`;

export const CardPhoneNumber = styled.div`
  ${defaultFontFamily}
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #6d7082;
  width: 100%;

  span {
    font-style: normal;
    font-weight: 600 !important;
    font-size: 14px;
    margin-left: 0px;
    color: #393939;
  }
`;

export const PrimaryContactAvatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

export const CommentAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

export const NotesContainer = styled.div`
  background: #ffedca;
  border-radius: 6px;
  padding: 15px;
  ${defaultFontFamily}
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #393939;
`;

export const OutlineButton = styled.div`
  background: #ffffff;
  border: 1px solid #aeaeae;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 12px 15px;
  width: 100%;
  ${defaultFontFamily}
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #393939;
  text-align: center;
`;

export const AssignTag = styled.div`
  ${defaultFontFamily}
  padding: 1px 3px;
  background: #e1e1e1;
  border-radius: 4px;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  color: #6d7082;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  margin-right: 5px;
  display: inline-block;
`;
