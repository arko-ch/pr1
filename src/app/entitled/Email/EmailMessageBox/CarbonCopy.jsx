import React from 'react';
import {
  EmailMessageBoXCarbonCopyContainer,
  EmailMessageBoxCCIcon,
  EmailCCImportant,
  EmailCCEncrypted,
  EmailSmallAvatar
} from '../StyledComponents';
import avatar1 from '../../../../assets/architect/utils/images/avatars/1.jpg';

const RenderLockIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
      >
        <path
          d="M6.75 3.5H6.375V2.375C6.375 1.06562 5.30937 0 4 0C2.69062 0 1.625 1.06562 1.625 2.375V3.5H1.25C0.835938 3.5 0.5 3.83594 0.5 4.25V7.25C0.5 7.66406 0.835938 8 1.25 8H6.75C7.16406 8 7.5 7.66406 7.5 7.25V4.25C7.5 3.83594 7.16406 3.5 6.75 3.5ZM5.125 3.5H2.875V2.375C2.875 1.75469 3.37969 1.25 4 1.25C4.62031 1.25 5.125 1.75469 5.125 2.375V3.5Z"
          fill="#00BF73"
        />
      </svg>
    </div>
  );
};

const CarbonCopy = ({ sender, status }) => {
  return (
    <EmailMessageBoXCarbonCopyContainer>
      <EmailCCImportant>IMPORTANT</EmailCCImportant>
      <EmailMessageBoxCCIcon>
        CC: <span>{sender}</span>
      </EmailMessageBoxCCIcon>
      {/* <EmailSmallAvatar src={avatar1} alt="" /> */}
      {/* <EmailCCSender>{sender || "sender@gmail.com.se.uq"}</EmailCCSender> */}
      {/* <EmailCCStatus>{status || "New"}</EmailCCStatus> */}
      <EmailCCEncrypted>
        Encrypted
        <span>
          <RenderLockIcon />
        </span>
      </EmailCCEncrypted>
    </EmailMessageBoXCarbonCopyContainer>
  );
};

export default CarbonCopy;
