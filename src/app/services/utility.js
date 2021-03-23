import update from 'immutability-helper';
import merge from 'merge';
import uuid from 'uuid/v1';
import { inflateRawSync } from 'zlib';

export const guid = uuid;

export function find(state, func, opt) {
  if (!state) {
    return null;
  }

  if (func(state)) {
    opt.result = opt.result || [];
    opt.result.push({ value: { ...state }, path: opt.path.join('.') });
    return state;
  }

  opt = opt || {};
  opt.path = opt.path || [];

  if (typeof state === 'object') {
    // array
    if (state.length !== undefined) {
      for (let i = 0; i < state.length; i++) {
        opt.path.push(i);
        let res = find(state[i], func, opt);
        if (res) {
          if (!opt.all) {
            return res;
          }
        }
        opt.path.pop();
      }
      return null;
    }

    // object
    let keys = Object.keys(state);
    for (let i = 0; i < keys.length; i++) {
      opt.path.push(keys[i]);
      let res = find(state[keys[i]], func, opt);
      if (res) {
        if (!opt.all) {
          return res;
        }
      }
      opt.path.pop();
    }
  }

  return null;
}

export function findById(state, id, opt) {
  return find(
    state,
    state => {
      return state.uuid === id;
    },
    opt
  );
}

export function pathToUpdateObject(path, value) {
  let p = path.split('.');
  let obj = {};
  let node = obj;

  let _n = null;
  let _node = null;

  p.forEach((n, idx) => {
    node[n] = {};

    if (idx === p.length - 1) {
      if (value && typeof value === 'object' && value.$splice !== undefined) {
        _node[_n] = { $splice: [[n, value.$splice]] };
      } else if (
        value &&
        typeof value === 'object' &&
        value.$push !== undefined
      ) {
        node[n] = { $push: [value.$push] };
      } else {
        node[n] = { $set: value };
      }
    }

    // keep track for array manipulation
    _n = n;
    _node = node;

    node = node[n];
  });
  return obj;
}

export function pathToValue(state, path) {
  let p = path.split('.');
  let node = state;

  for (let i = 0; i < p.length; i++) {
    let n = p[i];
    let v = node[n];
    if (i === p.length - 1) {
      return v;
    }
    if (typeof v !== 'object') {
      break;
    }
    node = v;
  }
}

export function mutateState(state, params) {
  let ih = {};
  Object.keys(params).forEach(k => {
    ih = merge.recursive(ih, pathToUpdateObject(k, params[k]));
  });
  return update(state, ih);
}

export function combinedReducers(reducers) {
  return function(state, action) {
    reducers.forEach(r => {
      state = { ...r(state, action) };
    });
    return state;
  };
}

export const getFirstLetter = str => {
  return str.charAt(0).toUpperCase();
};

export const capitalize = str => {
  return str
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

export const numbersWithCommas = num => {
  if (num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return;
};
