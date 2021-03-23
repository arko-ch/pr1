import React from 'react';
import {
  EmailAvatar as Avatar,
  AvatarContainer,
  AvatarBadgeContainer
} from './EmailStyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';

const EmailAvatar = ({ src }) => {
  return (
    <AvatarContainer>
      <AvatarBadgeContainer>
        <FontAwesomeIcon icon={Icons.fasGavel} />
      </AvatarBadgeContainer>
      <Avatar src={src} />
    </AvatarContainer>
  );
};

export default EmailAvatar;
