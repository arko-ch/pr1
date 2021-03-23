import React from 'react';
import {
  UploadItemContainer,
  InvoiceMoneyContainer
} from '../StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';

const RenderFolderIcon = () => {
  return (
    <div className="ml-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.5 4H14.5C15.3284 4 16 4.67156 16 5.5V12.5C16 13.3284 15.3284 14 14.5 14H1.5C0.671562 14 0 13.3284 0 12.5V3.5C0 2.67156 0.671562 2 1.5 2H6.5L8.5 4ZM8 5.75C8.41421 5.75 8.75 6.08579 8.75 6.5V8.25H10.5C10.9142 8.25 11.25 8.58579 11.25 9C11.25 9.41421 10.9142 9.75 10.5 9.75H8.75V11.5C8.75 11.9142 8.41421 12.25 8 12.25C7.58579 12.25 7.25 11.9142 7.25 11.5V9.75H5.5C5.08579 9.75 4.75 9.41421 4.75 9C4.75 8.58579 5.08579 8.25 5.5 8.25H7.25V6.5C7.25 6.08579 7.58579 5.75 8 5.75Z"
          fill="#00BF73"
        />
      </svg>
    </div>
  );
};

const UploadedInvoice = () => {
  return (
    <UploadItemContainer>
      <InvoiceMoneyContainer>$500</InvoiceMoneyContainer>
      <FontAwesomeIcon
        icon={Icons.faFilePdf}
        className="mr-1"
      /> Invoice332.pdf <RenderFolderIcon />
    </UploadItemContainer>
  );
};

export default UploadedInvoice;
