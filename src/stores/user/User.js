import React, { Component } from 'react';

// import { Cache } from "../../services/Cache";
import cache, { session } from '../../app/services/cache';
import http from '../../app/services/http';

// import Http from '../../services/Http';
import Config from '../../config/config';

const $root = Component.prototype.$root;

export const actions = {
  SET_USER: 'USER/SET_USER'
};

export const setUser = user => ({
  type: actions.SET_USER,
  user
});

// window.$c = Cache;
// const cache = Cache().$cache;
// const session = Cache().$session;

let defaultState = {
  user: session.get('user', {})
};

if (!defaultState.user.jwt) {
  if (
    document.referrer.length &&
    document.location.href.indexOf(document.referrer) !== -1
  ) {
    defaultState.user = cache.get('user', {});
    session.put('user', defaultState.user, { persist: true });
  }
} else {
  cache.put('user', defaultState.user, { persist: true });
}

if (defaultState.user.jwt) {
  // validate jwt
  http.defaults.headers.common['Authorization'] =
    'Bearer ' + defaultState.user.jwt;
  http
    .get(Config.app.server.url + '/users/me')
    .then(res => {
      console.log('token is valid');
      $root.$emit('user-authenticated', defaultState.user);
    })
    .catch(err => {
      console.log('token has expired');
      delete http.defaults.headers.common['Authorization'];
      cache.get('user', {}, { persist: true });
      session.put('user', {}, { persist: true });
      defaultState = {
        user: session.get('user', {})
      };
    });
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actions.SET_USER:
      cache.put('user', action.user, { persist: true });
      session.put('user', action.user, { persist: true });

      delete http.defaults.headers.common['Authorization'];
      if (action.user && action.user.jwt) {
        http.defaults.headers.common['Authorization'] =
          'Bearer ' + action.user.jwt; // strapi token
      }

      // console.log(JSON.stringify(action.user));
      $root.$emit('user-authenticated', action.user);

      return {
        ...state,
        user: action.user
      };
  }
  return state;
}
// window.$c = Cache;
// const cache = Cache().$cache;
// const session = Cache().$session;