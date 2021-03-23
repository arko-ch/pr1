import React, { Lazy } from 'react';

export default {
  prefix: '/settings',
  routes: [
    {
      path: '/{{models}}',
      component: React.lazy(() => import('./{{modelComponent}}List')),
      permissions: {
        authenticated: [ 'all' ]
      }
    },
    {
      path: '/{{models}}/:id',
      component: React.lazy(() => import('./{{modelComponent}}')),
      permissions: {
        authenticated: [ 'all' ]
      }
    }
  ]
};
