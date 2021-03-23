import React from 'react';
import cx from 'classnames';
import NavItem from './NavItem';
import Icon from '../../icons';
import { Component as Registry } from '../registry';
import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';
import Menu from './Menu';

export default function NavDropDown(props) {
  const [state, setState] = React.useState({});
  const toggle = evt => {
    setState({
      ...state,
      dropdownOpen: !state.dropdownOpen
    });
  };

  let items = props.items.map((item, idx) => {
    let ItemComponent = Registry(item.component) || DropdownItem;
    return (
      <ItemComponent key={idx} {...item}>
        {item.label}
      </ItemComponent>
    );
  });

  return (
    <Dropdown
      isOpen={state.dropdownOpen}
      toggle={toggle}
      nav
      inNavbar
      className="pl-2 pr-2"
    >
      <DropdownToggle nav caret>
        <Icon icon={props.icon} />
        {props.label && <span className="pl-1 pr-1">{props.label}</span>}
        {props.children}
      </DropdownToggle>
      <DropdownMenu right style={{ position: 'absolute' }}>
        {items}
      </DropdownMenu>
    </Dropdown>
  );
}
