import React from 'react';
import merge from 'merge';

import { mutateState } from '../services/utility';
//implement lazy loading for strapiV3
export const Store = React.createContext();

const initialState = {
  property: {
    navbar: {
      sticky: true
    }
  }
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
