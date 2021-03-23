import React from 'react';

export default {
  prefix: '/mailbox',
  routes: [
    {
      path: '/',
      component: React.lazy(() => import('./index')),
      permissions: {
        authenticated: ['all']
      }
    }
  ]
};

