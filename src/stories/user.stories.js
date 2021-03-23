import React from 'react';
import ProfileBadge from '../app/auth/components/ProfileBadge';

import '../assets/_App.css';
import '../Test.scss';

export default { title: 'User Stories' };

export const profileBadge = () => {
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@email.com'
  };
  return (
    <div className="p-4">
      <ProfileBadge user={user} />
    </div>
  );
};
