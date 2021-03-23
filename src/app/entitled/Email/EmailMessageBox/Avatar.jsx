import React from 'react';
import { EmailMessageBoxAvatar } from '../StyledComponents';
import avatar1 from '../../../../assets/architect/utils/images/avatars/1.jpg';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';

const Avatar = ({ avatar }) => {
  return <EmailMessageBoxAvatar src={avatar1 || avatar} alt="" />;
};

export default Avatar;
