import React from 'react';

import NavItem from './components/NavItem';
import NavBrand from './components/NavBrand';
import NavDivider from './components/NavDivider';
import NavDropDown from './components/NavDropDown';
import NavToggle, { NavSidebarToggle } from './components/NavToggle';
import NavSearch from './components/NavSearch';
import NavUserBadge from './components/NavUserBadge';

export const Registry = {
  'nav-item': NavItem,
  'nav-divider': NavDivider,
  'nav-dropdown': NavDropDown,
  'nav-brand': NavBrand,
  'nav-search': NavSearch,
  'nav-toggle': NavToggle,
  'nav-sidebar-toggle': NavSidebarToggle,
  'nav-user-badge': NavUserBadge
};

export function Component(c) {
  if (typeof c === 'string') {
    return Registry[c];
  }
  return c;
}
