import React, { Fragment } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import { Store as AuthStore } from '../auth/store';
import path from 'path';

import dashboard from '../dashboard/routes';
import auth from '../auth/routes';
//import mailbox from '../mailbox/routes';
//import contacts from '../contacts/routes';
//import property from '../property/routes';
//import tasks from '../tasks/routes';
import assignemail from '../assignemail/routes'
import mailbox from '../entitled/Email/routes'

function prefixRoutePath(path, routes) {
  return routes.map(r => {
    let m = Object.assign({}, r);
    m.path = (path + '/' + m.path).replace('//', '/');
    return m;
  });
}

const appRoutes = {
  auth,
  dashboard,
  mailbox,
  assignemail
};

const routes = [
  {
    path: '/links',
    title: 'Routes',
    component: ListRoutes,
    permissions: {
      authenticated: ['all']
    }
  },
  {
    path: '/who',
    title: 'Who',
    component: WhoAmI
  },





];

// ------------------
// add all app routes
// ------------------
Object.keys(appRoutes).forEach(k => {
  let group = appRoutes[k];
  group.routes.forEach(r => {
    let m = Object.assign({}, r);
    m.path = path.join(group.prefix || '', m.path);
    routes.push(m);
  });
});

function WhoAmI(props) {
  const store = React.useContext(AuthStore);
  //let user = store.state.user;//rawi0713
  return (
    <div className="p-4">
      <pre>{JSON.stringify(store.state, null, 4)}</pre>
    </div>
  );
}

function NoAccess(props) {
  //const store = React.useContext(AuthStore);//rawi0713
  //let user = store.state.user;//rawi0713
  return (
    /*
    <div className="p-4">
      <h2> No Access </h2>
      <pre>{JSON.stringify(store.state, null, 4)}</pre>
    </div>
    */
    <Redirect to="/auth/login" />
  );
}

function ListRoutes() {
  return (
    <div className="p-4">
      <ul>
        {routes.map((route, i) => {
          return (
            <li key={i}>
              <Link to={route.path || '/'}> {route.title || route.path} </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AllRoutes() {
  const store = React.useContext(AuthStore);
  let user = store.state.user;

  // window.$auth = store;

  let filteredRoutes = routes.map(route => {
    if (route.permissions && route.permissions.authenticated) {
      if (!user || !user.email) {
        let noaccess = Object.assign({}, route);
        noaccess.component = route.componentNoAccess || NoAccess;
        return noaccess;
      }
    }
    return route;
  });

  return (
    <Fragment>
      {filteredRoutes.map((route, i) => {
        return <Route exact key={i} {...route} />;
      })}
    </Fragment>
  );
}

export default routes;
