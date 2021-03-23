import React from 'react';
import merge from 'merge';

import { mutateState } from '../services/utility';

export const Store = React.createContext();

const initialState = {
  navbar: {},

  toolbar: {},

  panel: {},

  search: {
    text: '',
    active: false,
    show: false // show/hide search icon
  },

  modal: {},

  toast: {}
};

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
      return { ...state };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(
    reducer,
    merge.recursive(initialState, props.config || {})
  );
  const value = { state, dispatch, setState };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
