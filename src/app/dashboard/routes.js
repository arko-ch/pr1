import React from 'react';

export default {
  prefix: '/dashboard',
  routes: [

    {
      path: '/',
      component: React.lazy(() => import('./Dashboard')),
      permissions: {
        authenticated: ['all']
      }
    }
    
  ]
};
//route for elasticsearch engine ingestion
