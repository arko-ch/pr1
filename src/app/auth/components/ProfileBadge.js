import React from 'react';
import './style.scss';
import avatar from '../../../assets/utils/images/avatars/default-user-avatar.jpg';

export default function ProfileBadge(props) {
  let user = props.user || {};
  return (
    <div className="profile-badge pr-0">
      <div className="widget-content p-0">
        <div className="widget-content-wrapper">
          <img
            width={40}
            className="rounded-circle"
            src={user.avatar ? user.avatar : avatar}
            alt=""
          />
          <div className="widget-content-left ml-3 header-user-info">
            <div className="widget-heading">
              <a href="#/who">{user.name}</a>
            </div>
            <div className="widget-subheading">{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
//possible placeholder for reactivesearch