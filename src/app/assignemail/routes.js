import React from 'react';

export default {
  prefix: '/assignemail',
  routes: [
    {
      path: '/',
      component: React.lazy(() => import('./AssignEmail')),
      permissions: {
        authenticated: ['all']
      }
    }
  ]
};
//route for elasticsearch engine ingestion

// import HeaderRouter  from '../app/assignemail/Header/routes';

// const MainArea = lazy(() => import('./MainArea/Feed.js'));

// const Routes = [
//   // {
//   //     path: '/users',
//   //     component: Users,
//   //     permissions: {
//   //         authenticated: [ 'all' ]
//   //     }
//   // },
//   ...HeaderRouter
// ];

// export default Routes;
