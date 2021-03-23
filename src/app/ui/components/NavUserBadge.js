import React, { Fragment } from 'react';
import cx from 'classnames';
import Icon from '../../icons';
import { Store as UserStore } from '../../auth/store';
import NavProfileBadge from '../../auth/components/ProfileBadgeContainer';

export default function NavItem(props) {
  const userStore = React.useContext(UserStore);

  const children = React.Children.map(props.children, child =>
    React.cloneElement(child, props)
  );

  const contentClass = ['nav-item', props.className];
  let onClick = props.onClick;

  if (!userStore.state.user) {
    return <Fragment></Fragment>;
  }

  const user = userStore.state.user;

  return (
    <div className={cx(contentClass)}>
      <div className="nav-link flex-nowrap d-flex flex-row p-3">
        <NavProfileBadge user={user} />
      </div>
    </div>
  );
}

//possible placeholder for reactivesearch