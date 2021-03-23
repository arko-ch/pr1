import React from 'react';
import cx from 'classnames';
import Icon from '../../icons';
import NavToggle from './NavToggle';
import { Store } from '../../layout/store';
import { pathToValue } from '../../services/utility';

export default function(props) {
  const store = React.useContext(Store);
  let target = 'navbar.expand';
  let icons = props.icons || {};
  let icon = icons.expand;

  if (store.state.navbar.expand) {
    icon = icons.expand;
  }
  if (!store.state.navbar.expand) {
    icon = icons.compact;
  }

  return (
    <div
      className={cx([
        'nav-brand',
        'd-flex justify-content-center',
        props.className
      ])}
    >
      {!props.compact && (
        <div className={cx(['navbar-brand', 'p-2 flex-grow-1'])}>
          {props.label}
        </div>
      )}
      <NavToggle icon={icon} target={target} />
    </div>
  );
}
//docspringsupport