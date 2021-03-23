import React, { Fragment } from 'react';
import cx from 'classnames';
import Icon from '../../icons';
import { Component as Registry } from '../registry';
import { withRouter } from 'react-router-dom';

import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';

function DropMenu(props) {
  const [state, setState] = React.useState({});
  const toggle = evt => {
    setState({
      ...state,
      dropdownOpen: !state.dropdownOpen
    });
  };

  let items = props.items.map((item, idx) => {
    let ItemComponent = Registry(item.component) || DropdownItem;
    return <ItemComponent key={idx}>{item.label}</ItemComponent>;
  });

  const chevron = <Icon icon="angle-right" className="chevron float-right" />;
  const contentClass = ['m-0 p-0'];

  return (
    <Dropdown
      isOpen={state.dropdownOpen}
      toggle={toggle}
      nav
      inNavbar
      className="nav-dropdown-menu"
    >
      <DropdownToggle nav>
        <Icon icon={props.icon} />
        <span className="pl-2">{props.label}</span>
      </DropdownToggle>
      <DropdownMenu
        right={props.right}
        style={{ border: 'none', marginTop: '0px' }}
      >
        <nav className={cx(contentClass)}>
          <CollapseMenu
            {...props}
            horizontal={false}
            compact={false}
            expand={state.dropdownOpen}
          />
        </nav>
      </DropdownMenu>
    </Dropdown>
  );
}

function CollapseMenu(props) {
  return (
    <Collapse isOpen={props.expand}>
      <Menu {...props} />
    </Collapse>
  );
}

export function _Item(props) {
  // console.log('render item: ' + props.label);

  const {
    path,
    onSelect,
    activeItem,
    activeMenu,
    compact,
    horizontal,
    topLevel,
    right
  } = props;
  const menuProps = {
    path,
    onSelect,
    activeItem,
    activeMenu,
    compact,
    horizontal,
    topLevel,
    right
  };
  let subMenu, chevron;

  let expanded = props.expand;
  if (props.items) {
    subMenu = (
      <CollapseMenu {...menuProps} expand={props.expand} items={props.items} />
    );
    chevron = (
      <span className="p-2">
        <Icon icon="angle-right" className="chevron float-right" />
      </span>
    );
    if (props.horizontal) {
      expanded = props.id && props.id === props.activeMenu;
      return (
        <DropMenu
          {...props}
          {...menuProps}
          expand={expanded}
          items={props.items}
        />
      );
    }
  }

  const onClick = (evt, url) => {
    if (url) {
      props.history.push(url.replace('/#', ''));
      // console.log(url);
      evt.preventDefault();
      return;
    }
    evt.preventDefault();
    if (props.onSelect) {
      props.onSelect(evt);
    }
  };

  let contentClass = [
    props.className,
    { 'nav-item': true },
    { 'has-items': props.items && props.items.length },
    { 'is-expanded': expanded },
    { active: props.activeItem === props.id && props.id }
  ];

  if (props.compact) {
    return (
      <li className={cx(contentClass)}>
        <a
          className="nav-link p-2 pl-3 pr-3 text-center"
          id={props.path}
          // url={props.url}
          onClick={evt => {
            onClick(evt, props.url);
          }}
        >
          <Icon icon={props.icon || 'tag'} />
        </a>
        {subMenu}
      </li>
    );
  }

  return (
    <li className={cx(contentClass)}>
      <a
        className="nav-link flex-nowrap d-flex flex-row p-1"
        id={props.path}
        // url={props.url}
        onClick={evt => {
          onClick(evt, props.url);
        }}
      >
        <Fragment>
         {/*  <Icon icon={props.icon} /> */}
          {props.label && (
            <span className="pl-2 flex-grow-1">{props.label}</span>
          )}
          {chevron}
        </Fragment>
      </a>
      {subMenu}
    </li>
  );
}

const Item = withRouter(_Item);
export { Item };

function _Menu(props) {
  const {
    path,
    onSelect,
    activeItem,
    activeMenu,
    compact,
    horizontal,
    topLevel,
    right
  } = props;

  const menuProps = {
    path,
    onSelect,
    activeItem,
    activeMenu,
    compact,
    horizontal,
    topLevel,
    right
  };

  let items = (props.items || []).map((item, idx) => {
    if (item.idx !== undefined) {
      idx = item.idx;
    }
    let path = `${props.path}.items.${idx}`;
    let ItemComponent = Registry(item.component) || Item;
    return (
      <ItemComponent key={path} {...menuProps} path={path} {...item}>
        {item.content}
      </ItemComponent>
    );
  });
  return (
    <ul
      className={cx([
        'navbar-nav',
        props.horizontal ? 'flex-row' : 'flex-column'
      ])}
    >
      {items}
    </ul>
  );
}

const Menu = React.memo(_Menu);
export default Menu;
