/*
import React from 'react';
import cx from 'classnames';
import Icon from '../../icons';
import { Store } from '../store';
import debounce from 'debounce';

export default function(props) {
  const store = React.useContext(Store);
  const state = store.state;

  const _search = debounce((keywords) => {
    store.dispatch(store.setState({'search.text': keywords}));
  }, 150)

  const onSearch = (evt) => {
    _search(evt.target.value);
  };

  const toggleSearch = (evt) => {
    evt.preventDefault();
    // setState({
    //   show: !state.show
    // })

    store.dispatch(store.setState({'search.active': !state.search.active}));

    if (!state.search.active) {
      setTimeout(() => {
        let inp = document.querySelector('.nav-tlb-search input');
        inp.focus();
        inp.select();
      }, 550);
    }
  }

  const styleTransition = {
    transition: 'all 0.6s ease',
    opacity: '0'
  }

  const styleInner = {
    position: 'absolute',
    display: 'block',
    top: '0px',
    left: '0px',
    zIndex: '200',
    width: '100%',
    height: '100%',
    padding: '8px'
  }

  if (!state.active) {
    styleInner.display = 'none';
  } else {
    styleTransition.opacity = '100';
    styleTransition.width = 'auto';
  }

  return <div className="nav-tlb-search">
      <a className='btn btn-link' href="#" onClick={toggleSearch}>
        <Icon icon='search'/>{props.label}
      </a>
      <div style={styleTransition}>
      <nav style={styleInner} className="navbar bg-light m-0 p-0">
        <ul className="navbar-nav">
          <li className="form-inline m-2 d-flex">
            <input className="form-control flex-grow-1" placeholder={props.placeholder}
              onBlur={toggleSearch}
              onChange={onSearch}
              />
            <a className='btn btn-link' href="#" onClick={toggleSearch}><Icon icon='times'/></a>
          </li>
        </ul>
      </nav>
      </div>
    </div>
}
*/
//possible placeholder for reactivesearch