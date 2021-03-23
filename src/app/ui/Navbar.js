import React, { Fragment } from 'react';
import VerticalMenu from './components/VerticalMenu';
import HorizontalMenu from './components/HorizontalMenu';
import { Store } from './store';
import { Store as LayoutStore } from '../layout/store';
import MenuState from './menuState';
import debounce from 'debounce';

const ms = new MenuState('navbar');

let showIntervalId = 0;

const repositionNavbar = () => {
  var ashN = document.querySelector(
    '.ash-navbar > :first-child > :first-child'
  );
  if (!ashN) {
    repositionNavbarDebounced();
    return;
  }

  var w = window.scrollY;
  // ashN.style.marginTop = `${w}px`;
};

const resizeNavbar = compact => {
  var ashN = document.querySelector(
    '.ash-navbar > :first-child > :first-child'
  );

  ashN.style.width = compact ? '80px' : '300px';
};

const repositionNavbarDebounced = debounce(repositionNavbar, 50);

const showMenu = evt => {
  let layoutStore = ms.layoutStore;
  if (layoutStore.state.navbar.expand && layoutStore.state.navbar.compact) {
    showIntervalId = setTimeout(() => {
      layoutStore.dispatch(
        layoutStore.setState({
          // 'navbar.expand': true
          'navbar.compact': false,
          'overlay.enabled': true
        })
      );
      // resizeNavbar(false);
    }, 250);
  }
};

const hideMenu = evt => {
  let layoutStore = ms.layoutStore;
  if (layoutStore.state.navbar.expand && !layoutStore.state.navbar.compact) {
    clearTimeout(showIntervalId);
    setTimeout(() => {
      layoutStore.dispatch(
        layoutStore.setState({
          // 'navbar.expand': false
          'navbar.compact': true,
          'overlay.enabled': false
        })
      );
      // resizeNavbar(true);
    }, 150);
  }
};

const onScroll = () => {
  repositionNavbar();
};

export default function Navbar(props) {
  const layoutStore = React.useContext(LayoutStore);
  const store = React.useContext(Store);
  const state = store.state.navbar;

  ms.useContext(store, store.setState);
  ms.layoutStore = layoutStore;

  let classNames = layoutStore.state.classList || {};
  let vert = !classNames['t-nav'];
  let Component = vert ? VerticalMenu : HorizontalMenu;

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  let expand = layoutStore.state.navbar.expand;
  let compact = layoutStore.state.navbar.compact;
  React.useEffect(() => {
    if (expand && !compact) {
      resizeNavbar(false);
    } else {
      resizeNavbar(true);
    }
  }, [expand, compact]);

  return (
    <div>
      {}
      <Component
        onMouseEnter={showMenu}
        onMouseLeave={hideMenu}
        className="navbar navbar-expand-sm bg-white navbar-light"
        // compact={classNames['c-nav']}
        compact={layoutStore.state.navbar.compact}
        path="navbar"
        onSelect={ms.onSelect}
        items={state.items}
      ></Component>
    </div>
  );
}
