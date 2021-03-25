import React from 'react';
import CheckMail from '../../../src/components/Inbox';
export default {
  prefix: '/inbox',
  routes: [
    {
      path: '/',
      component: React.lazy(() => import('../../../src/components/Inbox')),
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
