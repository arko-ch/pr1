import styled from 'styled-components';

const defaultFontFamily = 'font-family:Open sans';

export const EmailContentContainer = styled.div`
  margin-top: 5px;
  border-top: 1px solid #000;
`;

export const EmailButton = styled.button`
  background: transparent;
  border: none;
  color: #307df6;
`;

export const EmailTime = styled.p`
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0em;
  color: #656565;
  margin-bottom: 0;
  ${defaultFontFamily};
`;

export const EmailSubject = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  color: #393939;
  margin-bottom: 0;
  ${defaultFontFamily};
`;

export const EmailButtonLink = styled.button`
  background: transparent;
  color: #307df6;
  ${defaultFontFamily};
  font-size: 1px;
  font-style: normal;
  font-weight: 600;
  border: none;
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
  position: relative;
`;

export const EmailConversationContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 5px;
  width: 100%;
  position: relative;
`;

export const EmailBtnTheme = styled.button`
  background: rgba(48, 125, 246, 0.1);
  border: none;
  font-size: 10px;
  color: #307df6;
  border-radius: 4px;
  margin-left: 5px;
`;

export const EmailBarsContainer = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

export const EmailStrengthText = styled.div`
  color: #f6b130;
  margin-bottom: 0px;
  ${defaultFontFamily};
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
`;

export const EmailStrengthBarGray = styled.div`
  background: #f6b130;
  border-radius: 1px;
  width: 10px;
  height: 2px;
  box-sizing: border-box;
  margin: 0 1px;
`;

export const EmailStrengthBarGold = styled.div`
  background: #aeaeae;
  border-radius: 1px;
  width: 10px;
  height: 2px;
  box-sizing: border-box;
  margin: 0 1px;
`;

export const ConversationBadge = styled.div`
  color: #307df6;
  padding: 0px;
  background: #fff;
  border-radius: 4px;
  margin-left: 5px;
  text-align: center;
  width: 20px;
  float: right;
  font-size: 8px;
  margin-top: 3px;
`;

export const EmailTabIconContainer = styled.div`
  width: 29px;
  height: 29px;
  background: rgba(108, 48, 246, 0.08);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 11px;
`;

export const EmailInputContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 16px;
  margin-top: 12px;
  position: relative;
`;

export const EmailActionButtonsContainer = styled.div`
  display: flex;
  margin-top: 17px;
  width: 100%;
`;

export const EmailActionButton = styled.button`
  color: #656565 !important;
  ${defaultFontFamily};
  font-weight: 500;
  font-size: 12px;
  background: #e7e7e7 !important;
  border-radius: 8px;
  padding: 8px 12px;
  margin-right: 12px;
  margin-top: 10px;
`;

export const EmailCloseButtonContainer = styled.div`
  cursor: pointer;
  background: #e7e7e7;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  color: #c4c4c4;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmailSendButton = styled.button`
  color: #fff;
  background: #00bf73;
  border-radius: 4px;
  padding: 7px 15px;
  margin-left: 12px;
`;

export const EmailInvertSendButton = styled.button`
  background: rgba(0, 191, 115, 0.2);
  border-radius: 4px;
  width: 88px;
  padding: 7px 15px;
  position: relative;
  color: #00bf73;
`;

export const EmailMessageBoxContainer = styled.div`
  padding: 15px;
  background: transparent;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: ${props => (props.isOpen ? 'none' : '1px solid #e1e1e1')};
`;

export const EmailMessageBoxAvatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

export const EmailMessageBoxSender = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #393939;
  ${defaultFontFamily};
  font-style: normal;
  font-weight: 500;
  font-size: 10px;

  > span {
    color: #307df6;
    margin-left: 5px;
  }
`;

export const EmailMessageBoXCarbonCopyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 5px;
`;

export const EmailMessageBoxCCIcon = styled.div`
  // padding: 4px;
  // width: 20px;
  // height: 16px;
  // background: #e7e7e7;
  // border-radius: 4px;
  // color: #656565;
  // ${defaultFontFamily};
  // font-size: 8px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // margin-right: 8px;

  color: #6d7082;
  font-size: 10px;
  background: #e1e1e1;
  border-radius: 4px; 
  font-weight:700;
  padding:3px;
  margin-right:5px;

  span {
    font-weight:400;
  }
`;

export const EmailCCSender = styled.div`
  ${defaultFontFamily};
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  color: #656565;
  margin-right: 4px;
`;

export const EmailCCStatus = styled.div`
  background: rgba(246, 177, 48, 0.2);
  border-radius: 4px;
  padding: 4px;
  font-style: normal;
  font-weight: 500;
  ${defaultFontFamily};
  font-size: 8px;
  color: #f6b130;
  margin-right: 4px;
  text-transform: Uppercase;
`;

export const EmailCCImportant = styled.div`
  ${defaultFontFamily};
  background: #ffedca;
  border-radius: 4px;
  padding: 3px;
  color: #ffa600;
  font-weight: 700;
  font-size: 10px;
  text-transform: Uppercase;
  margin-right: 5px;
`;

export const EmailCCEncrypted = styled.div`
  ${defaultFontFamily};
  background: #ccf2e3;
  border-radius: 4px;
  padding: 3px 5px;
  color: #00bf73;
  font-weight: 700;
  font-size: 10px;
  text-transform: Uppercase;
  display: flex;
  align-items: center;

  span {
    margin-left: 3px;
  }
`;

export const EmailMessageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #393939;
  ${defaultFontFamily};
  font-weight: 500;
  font-size: 16px;
  margin-top: 12px;
`;

export const MessageBoxFooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

export const MessageMoneyValue = styled.span`
  color: #00bf73;
  margin-left: 5px;
  margin-right: 5px;
`;

export const CalendarContainer = styled.div`
  cursor: pointer;
  color: #307df6;
  margin-left: 5px;
  margin-right: 5px;
`;

export const CalendarIconContainer = styled.span`
  margin-right: 5px;
`;

export const FooterDateContainer = styled.span`
  color: #656565;
  font-size: 10px;
  font-weight: 500;
`;

export const EmailTabContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dbdce1;
  align-items: center;
  padding: 15px;
`;

export const EmailGrayButton = styled.button`
  ${defaultFontFamily};
  background: #e7e7e7;
  border-radius: 4px;
  color: #656565;
  border: none;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  padding: 7px 8px;
`;

export const EmailBlueButton = styled.button`
  ${defaultFontFamily};
  background: #307df6;
  border-radius: 6px;
  color: #fff;
  border: none;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  padding: 11px;

  :disabled {
    color: #97befb;
  }

  svg {
    font-size: 16px;
  }
`;

export const EmailSearch = styled.input`
  width: 108px;
  height: 30px;
  padding: 7px 15px;
  background: #ffffff;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  border-radius: 12px;
  Font 
  ${defaultFontFamily};
  font-weight: 500;
  font-size: 13px;
  ::placeholder:{
    color: #AEAEAE;
  }
`;

export const EmailBadge = styled.div`
  margin-left: 5px;
`;

export const EmailSmallAvatar = styled.img`
  border-radius: 8px;
  width: 12px;
  height: 12px;
  margin-right: 5px;
`;

export const UploadContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 15px 0;
`;

export const UploadItemContainer = styled.div`
  display: inline-flex;
  padding: 10px 12px;
  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  color: #393939;
  ${defaultFontFamily};
  font-weight: 600;
  font-size: 12px;
  align-items: center;
  margin-right: 11px;
  max-width: 245px;
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

export const InvoiceMoneyContainer = styled.div`
  background: rgba(46, 240, 119, 0.1);
  border-radius: 4px;
  padding: 4px 6px;
  color: #00bf73;
  ${defaultFontFamily};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  margin-right: 10px;
`;

export const PopoverButton = styled.div`
  padding: 10px 15px;
  ${defaultFontFamily};
  font-size: 14px;
  font-weight: 600;
  color: #6d7082;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .email-angle-right {
    color: #307df6;
    font-size: 14px;
  }

  &:hover {
    background: #f1f3f9;
    border-radius: 4px;
  }
`;

export const PopoverContainer = styled.div`
  position: absolute;
  right: -140px;
  top: 25px;
  background: #ffffff;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(63, 95, 145, 0.15);
  border-radius: 6px;
  width: 200px;
  z-index: 6;
  padding: 5px 5px;
`;

export const SearchPopoverContainer = styled.div`
  position: absolute;
  width: 700px;
  background: #ffffff;
  border: 1px solid rgba(0, 191, 115, 0.2);
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.36);
  top: 0;
  left: 11%;
  z-index: 6;
  padding: 15px 15px 10px 15px;
`;

export const SearchInputStyled = styled.input`
  padding: 7px 15px;
  background: #ffffff;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  border-radius: 12px;
  ${defaultFontFamily};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  color: #393939;
  width: 100%;
`;

export const EmailCloseSearchButtonContainer = styled.div`
  cursor: pointer;
  background: #eaedf0;
  width: 20px;
  height: 20px;
  color: #000;
  position: absolute;
  border-radius: 5px;
  top: 8px;
  right: 10px;
  font-size: 12px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmailFilterButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0px;
`;

export const EmailFilterButtons = styled.button`
  padding: 5px 10px;
  background: #f3f6fb;
  border: 1px solid #cbd8ed;
  box-sizing: border-box;
  border-radius: 8px;
  color: #4b4f6a;
  ${defaultFontFamily};
  font-size: 12px;
  font-weight: 600;
  margin-right: 10px;
  position: relative;
`;

export const EmailSearchPopover = styled.div`
  padding: 9px 0px;
  position: absolute;
  width: 112px;
  height: 123px;
  left: 0;
  top: 31px;
  background: #ffffff;
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.36);
  border-radius: 7px;
`;

export const SearchResultsContainer = styled.div`
  border-top: 1px solid #e1e1e1;
  margin-top: 9px;
`;

export const SearchResultsItems = styled.div`
  ${defaultFontFamily};
  font-size: 14px;
  font-weight: 600;
  color: #393939;
  padding: 11px 0;
  border-bottom: 1px solid #e1e1e1;
  margin: 0 5px;
  cursor: pointer;
`;

export const SearchFooterContainer = styled.div`
  display: flex;
  margin-top: 12px;
`;

export const ButtonPopoverContainer = styled.div`
  padding: 9px 0px;
  position: absolute;
  width: 166px;
  right: -90%;
  top: -7px;
  background: #ffffff;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(63, 95, 145, 0.15);
  border-radius: 6px;
  text-align: left;
  z-index: 3;
`;

export const EmailTextArea = styled.textarea`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #e7e7e7;
  font-weight: 500;
  font-size: 16px;
  height: 150px;
  width: 100%;
  ${defaultFontFamily};
  font-size: 16px;
  font-weight: 500;
  resize: none;

  &::placeholder {
    ${defaultFontFamily};
    font-size: 16px;
    font-weight: 500;
    color: #aeaeae;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

export const UploadButtons = styled.button`
  padding: 7px 12px;
  background: #e7e7e7;
  border-radius: 8px;
  color: #656565;
  margin-left: 10px;
`;

export const TemplatesContainer = styled.div`
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #aeaeae;
  border-radius: 6px;
  margin-top: 16px;
`;

export const TemplateItemsContainer = styled.div`
  padding: 15px;
  background: #ffffff;
  border: 1px solid #aeaeae;
  box-sizing: border-box;
  border-radius: 6px;
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 12px;
  cursor: pointer;
  flex-wrap: wrap;

  .template-name {
    ${defaultFontFamily};
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    color: #393939;
  }

  .template-description {
    ${defaultFontFamily};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    color: #000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 10px;
  }

  .template-description-open {
    ${defaultFontFamily};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    color: #000;
    margin-top: 10px;
  }

  .template-icons {
    color: #4b4f6a;
    font-size: 20px;
    margin-left: 12px;
  }
`;

export const CalendarGreet = styled.div`
  ${defaultFontFamily};
  font-size: 20px;
  font-weight: 600;
  color: #393939;
`;

export const CalendarDescription = styled.div`
  ${defaultFontFamily};
  font-size: 17px;
  font-weight: 400;
  color: #393939;
  margin-top: 11px;
`;

export const CalendarTextarea = styled.textarea`
  ${defaultFontFamily};
  resize: none;
  padding: 7px 9px;
  height: 295px;
  border-radius: 6px;
  border: 1px solid #e7e7e7;
  width: 100%;
  margin: 30px 0 40px 0;

  ::placeholder {
    font-size: 14px;
    font-weight: 400;
    color: #aeaeae;
  }
`;

export const CalendarBodyContainer = styled.div`
  display: flex;
`;

export const CommentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  border-bottom: 1px solid #e1e1e1;
`;

export const EmailCommentText = styled.div`
  ${defaultFontFamily};
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  margin-right: 20px;
  color: #393939;
`;

export const EmailBlueButtonSmall = styled.button`
  padding: 5px;
  background: #307df6;
  border-radius: 6px;
  color: #fff;
  display: inline-flex;
  align-items: center;
  ${defaultFontFamily};
  font-size: 8px;
  font-weight: 500;
`;

export const CommentImg = styled.img`
  border-radius: 8px;
  width: 30px;
  height: 30px;
`;

export const CommentBodyText = styled.div`
  ${defaultFontFamily};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: #393939;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const CommentDiscussionButton = styled.button`
  padding: 6px;
  background: linear-gradient(0deg, #f1f3f9, #f1f3f9), #ffffff;
  border-radius: 4px;
  ${defaultFontFamily};
  font-size: 12px;
  color: #6d7082;
  font-weight: 400;
`;

export const CommentBodyCollapse = styled.div`
  ${defaultFontFamily};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: #393939;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EmailCommentButtonContainer = styled.div`
  cursor: pointer;
  padding: 1px;
  background: #dfecff;
  border-radius: 4px;
  display: inline-flex;
`;

export const LightBlueBUtton = styled.button`
  display: inline-flex;
  padding: 4px 8px;
  background: #d6e5fd;
  border-radius: 4px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: #307df6;
  align-items: center;
`;
