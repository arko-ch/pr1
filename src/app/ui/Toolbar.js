import React from 'react';
import HorizontalMenu from './components/HorizontalMenu';
import { Store } from './store';
import { Store as LayoutStore } from '../layout/store';
import MenuState from './menuState';
import debounce from 'debounce';

const ms = new MenuState('toolbar');

const resizeToolbar = () => {
  var ashT = document.querySelector('.ash-toolbar');
  if (!ashT) {
    resizeToolbarDebounced();
    return;
  }

  // var ashN = document.querySelector('.ash-navbar');
  var nav = ashT.querySelector(':first-child > :first-child');
  if (!nav) {
    resizeToolbarDebounced();
  }
  var w = ashT.offsetWidth - 80; // ashN.offsetWidth;
  nav.style.width = `${w}px`;
};

const resizeToolbarDebounced = debounce(resizeToolbar, 50);

export default function Toolbar(props) {
  const layoutStore = React.useContext(LayoutStore);
  const store = React.useContext(Store);
  const state = store.state.toolbar;

  ms.useContext(store, store.setState);

  React.useEffect(() => {
    resizeToolbarDebounced();
  }, [layoutStore.state.layout.width]);

  setTimeout(resizeToolbar, 500);
  setTimeout(resizeToolbar, 750);
  setTimeout(resizeToolbar, 1000);

  return (
    <HorizontalMenu
      className="navbar"
      path="toolbar"
      onSelect={ms.onSelect}
      activeItem={state.activeItem}
      items={state.items}
    ></HorizontalMenu>
  );
}
