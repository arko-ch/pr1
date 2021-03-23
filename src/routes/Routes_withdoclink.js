import React, { Component, Fragment, lazy } from 'react';
import { withRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../stores/user/User';

import PropertyRoutes from '../Pages/Property/routes';
import ContactsRoutes from '../Pages/Contacts/routes';
import TasksRoutes from '../Pages/Tasks/routes';

import SettingsRoutes from '../Pages/Settings/routes';

function prefixRoutePath(path, routes) {
  return routes.map(r => {
    let m = Object.assign({}, r);
    m.path = (path + '/' + m.path).replace('//', '/');
    return m;
  });
}


function ListRoutes() {
  return (
    <Fragment>
      <ul>
        {routes.map((route, i) => {
          return (
            <li key={i}>
              <Link to={route.path}> {route.title || route.path} </Link>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}


const routes = [
  {
    path: '/routes',
    title: 'Home',
    component: ListRoutes,
    permissions: {
      authenticated: ['all']
    }
  },

  ...prefixRoutePath('/settings', SettingsRoutes),
  ...prefixRoutePath('/pages', ContactsRoutes),  
  ...prefixRoutePath('/pages', PropertyRoutes),
  ...prefixRoutePath('/pages', TasksRoutes)
  
];

export function getRouteLayout(path) {
  for (let i = 0; i < routes.length; i++) {
    let p = (routes[i].path + ':').split(':')[0];
    if (p.startsWith(path)) {
      return routes[i].layout;
    }
  }
  return null;
}

class NoAccess extends Component {
  render() {
    this.props.history.push('/login');
    return <h2> No Access </h2>;
  }
}

class Routes extends Component {
  constructor(props) {
    super(props);
    console.log('Routes!');
  }

  render() {
    let user = null;
    if (this.props.user) {
      user = this.props.user;
    }

    // console.log(JSON.stringify(user));

    let filteredRoutes = routes.map(route => {
      if (route.permissions != null) {
        if (user == null || !user.user || !user.user.email) {
          let noaccess = Object.assign({}, route);
          noaccess.component = route.componentNoAccess || withRouter(NoAccess);
          // return noaccess;
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
}

const mapStateToProps = state => ({
  user: state.User.user
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

class _GlobalRouter extends Component {
  constructor(props) {
    super(props);
    Component.prototype.$router = this;
  }

  render() {
    return <Fragment></Fragment>;
  }
}

class _GlobalRouterLink extends Component {
  constructor(props) {
    super(props);
    Component.prototype.$router = this;
  }

  render() {
    return <Fragment></Fragment>;
  }
}

export const GlobalRouter = withRouter(_GlobalRouter);

export const GlobalRouterLink = withRouter(_GlobalRouterLink);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
