import React, { Fragment } from 'react';
import NavItem from './NavItem';
import { Store } from '../../layout/store';
import { pathToValue } from '../../services/utility';

export default function NavToggle(props) {
  const store = React.useContext(Store);
  let target = props.target;
  let isOn = pathToValue(store.state, target);

  const onClick = evt => {
    evt.preventDefault();

    if (!target) {
      return;
    }

    let state = {};
    state[target] = !isOn;
    store.dispatch(store.setState(state));
  };

  let icon = props.icon;
  if (props.icons && props.icons.length === 2) {
    icon = props.icons[isOn ? 1 : 0];
  }

  return <NavItem {...props} icon={icon} onClick={onClick} />;
}

export function NavSidebarToggle(props) {
  const store = React.useContext(Store);
  const state = store.state;
  const navbarShown = state.navbar.shown && state.layout.width > 768;
  if (navbarShown) {
    return <Fragment></Fragment>;
  }
  return <NavToggle {...props} target="navbar.shownMobile" />;
}
