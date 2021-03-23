import React from 'react';
import { UploadItemContainer } from '../StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';

const RenderFolderIcon = () => {
  return (
    <div className="ml-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.5 2H14.5C15.3284 2 16 2.67156 16 3.5V10.5C16 11.3284 15.3284 12 14.5 12H1.5C0.671562 12 0 11.3284 0 10.5V1.5C0 0.671562 0.671562 0 1.5 0H6.5L8.5 2ZM10.2981 4.70191C10.591 4.9948 10.591 5.46967 10.2981 5.76257L9.06066 7L10.2981 8.23744C10.591 8.53033 10.591 9.00521 10.2981 9.2981C10.0052 9.59099 9.53033 9.59099 9.23744 9.2981L8 8.06066L6.76256 9.2981C6.46967 9.59099 5.9948 9.59099 5.7019 9.2981C5.40901 9.00521 5.40901 8.53033 5.7019 8.23744L6.93934 7L5.7019 5.76257C5.40901 5.46967 5.40901 4.9948 5.7019 4.70191C5.9948 4.40901 6.46967 4.40901 6.76256 4.70191L8 5.93934L9.23744 4.70191C9.53033 4.40901 10.0052 4.40901 10.2981 4.70191Z"
          fill="#AEAEAE"
        />
      </svg>
    </div>
  );
};

const UploadImage = () => {
  return (
    <UploadItemContainer>
      <FontAwesomeIcon icon={Icons.faImage} className="mr-1" /> image.png
      <RenderFolderIcon />
    </UploadItemContainer>
  );
};

export default UploadImage;
