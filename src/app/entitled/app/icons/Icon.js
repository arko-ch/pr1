import React, { Fragment } from 'react';
import { FontAwesomeIcon as TheFontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library as faLibrary } from './registry_fontawesome';
import { library as ionLibrary } from './registry_ionicons';

function IconWrapper(props) {
  if (!props.icon) {
    console.warn('icon invalid', props.icon);
    return <Fragment></Fragment>;
  }

  let icon = props.icon || {};

  if (typeof icon === 'string') {
    if (icon.indexOf('pe') !== -1) {
      return <i className={`${icon} ml-1 mr-1`} style={{ zoom: '1.2' }}></i>;
    }
    icon = Library[icon];
  }

  if (typeof icon === 'function') {
    let Ionicon = icon;
    return <Ionicon {...props} />;
  }

  if (!icon || !icon.prefix || icon.prefix.indexOf('fa') !== 0) {
    if (props.icon !== 'no-icon') {
      console.warn('icon not found - ' + props.icon);
    }
    return <Fragment></Fragment>;
  }

  return <TheFontAwesomeIcon className="ash-icon" {...props} icon={icon} />;
}

export const FontAwesomeIcon = IconWrapper;
export const Ionicon = IconWrapper;
export default IconWrapper;
export const Library = {
  ...faLibrary,
  ...ionLibrary
};
