import React, { Lazy } from 'react';

export default {
  prefix: '/auth',
  routes: [
    {
      layout: { 'content.fullPage': true },
      path: '/login',
      component: React.lazy(() => import('./Login'))
    }
  ]
};
//password expiration support - self service change password
 //route for simpli_tbd