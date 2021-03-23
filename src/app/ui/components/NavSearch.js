import React from 'react';
import NavItem from './NavItem';
import { Store as UIStore } from '../store';
import debounce from 'debounce';

function SearchBar(props) {
  // move to scss
  const styleTransition = {
    transition: 'opacity 0.4s ease, zIndex 0s',
    opacity: '0'
  };

  const styleInner = {
    position: 'absolute',
    display: 'block',
    top: '0px',
    left: '0px',
    zIndex: '200',
    width: '100%',
    height: '100%',
    padding: '2px'
  };

  if (!props.show) {
    styleInner.display = 'none';
  } else {
    styleTransition.opacity = '100';
    styleTransition.width = 'auto';
  }

  return (
    <div style={styleTransition}>
      <div style={styleInner} className="navbar bg-white">
        <ul className="navbar-nav w-100 flex-row">
          <li className="form-inline flex-grow-1">
            <input
              className="form-control w-100"
              placeholder={props.placeholder}
              onBlur={props.onClose}
              onChange={props.onSearch}
            />
          </li>
          <NavItem
            className="nav-icon-only"
            icon="times"
            onClick={props.onClose}
          />
        </ul>
      </div>
    </div>
  );
}

export default function(props) {
  const uiStore = React.useContext(UIStore);
  const state = uiStore.state.search;
  // const [state, setState] = React.useState({ show: false });

  const _search = debounce(keywords => {
    uiStore.dispatch(uiStore.setState({ 'search.text': keywords }));
  }, 150);

  const onSearch = evt => {
    _search(evt.target.value);
  };

  const toggleSearch = evt => {
    evt.preventDefault();
    // setState({
    //   show: !state.show
    // });

    uiStore.dispatch(uiStore.setState({ 'search.active': !state.active }));

    if (!state.active) {
      setTimeout(() => {
        let inp = document.querySelector('.nav-search input');
        if (!inp) {
          // oops?
          return;
        }
        inp.focus();
        inp.select();
      }, 550);
    }
  };

  if (state.show !== true) {
    return <div></div>;
  }

  return (
    <div className="nav-search">
      <SearchBar
        {...props}
        show={state.active}
        onClose={toggleSearch}
        onSearch={onSearch}
      />
      {!state.active && <NavItem icon="search" onClick={toggleSearch} />}
    </div>
  );
}
