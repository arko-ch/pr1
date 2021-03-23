import React from 'react';
import cx from 'classnames';
import Icon from '../../icons';

export default function NavItem(props) {
  const children = React.Children.map(props.children, child =>
    React.cloneElement(child, props)
  );

  const contentClass = ['nav-item', props.className];
  let onClick = props.onClick;

  return (
    <div className={cx(contentClass)}>
      <a
        className="nav-link flex-nowrap d-flex flex-row p-3"
        id={props.path}
        onClick={onClick}
      >
        {props.icon && <Icon className="ash-icon" icon={props.icon} />}
        {props.label && <label>{props.label}</label>}
        {children}
      </a>
    </div>
  );
}
