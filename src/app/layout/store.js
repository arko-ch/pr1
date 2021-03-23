import React from 'react';
import merge from 'merge';
import cx from 'classnames';
import { mutateState } from '../services/utility';
import ashlar from './ashlar';

export const Store = React.createContext();

const initialState = {
  links: {},
  layout: {
    width: window ? window.innerWidth : 1024,
    boxed: false
  },

  content: {
    enabled: true,
    transparent: true
  },

  overlay: {},

  debug: {
    box: false,
    contentClass: true
  },

  navbar: {
    enabled: true,
    shown: true,
    position: 'left',
    mode: 'push',
    compact: true,
    expand: true
  },

  toolbar: {
    enabled: true,
    shown: true,
    sticky: true,
    position: 'inside'
  },

  panel: {
    enabled: true,
    shown: true,
    position: 'right',
    compact: false,
    mode: 'push',
    offCanvas: true
  }
};

/*
const _initialState = {
  layout: {
    width: window ? window.innerWidth : 1024,
    boxed: false
  },

  debug: {
    box: false,
    gap: false
  },

  overlay: {
    enabled: false,
    shown: false
  },

  navbar: {
    enabled: true,
    shown: true,
    compact: true,
    expand: false,
    autoCompact: true,
    expandSlide: true,
    offCanvas: true,
    position: 'left',
    mode: 'slide'
  },

  toolbar: {
    enabled: true,
    shown: true,
    position: 'inside',
    sticky: true
  },

  panel: {
    enabled: true,
    shown: false,
    compact: true,
    position: 'right',
    offCanvas: false,
    mode: 'slide'
  },

  content: {
    fullPage: false
  }
};
*/

/* params: { path:value } */
export function setState(params) {
  return {
    type: 'SET_STATE',
    ...params
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_STATE':
      let params = { ...action };
      delete params.type;
      state = mutateState(state, params);
      const { contentClass } = ashlar.calculateLayoutClassList(state);
      state.contentClass = contentClass;
      return { ...state };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const config = merge.recursive(initialState, props.config || {});
  const { classList, contentClass } = ashlar.calculateLayoutClassList(config);
  config.classList = classList;
  config.contentClass = contentClass;

  const [state, dispatch] = React.useReducer(reducer, config);
  const value = { state, dispatch, setState };

  /*
  React.useEffect(() => {
    dispatch(
      setState({
        isLoaded: true
      })
    );
  }, []);
  */

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
