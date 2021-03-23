import React from 'react';
import { Store } from '../store';
import ProfileBadge from './ProfileBadge';

export default function ProfileBadgeContainer(props) {
  const store = React.useContext(Store);
  let user = store.state.user || {};
  return <ProfileBadge user={user} />;
}
