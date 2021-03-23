import { Redirect, Route } from 'react-router-dom';
import React, { Component, Fragment, lazy, Suspense } from 'react';
//const EmailSorting = lazy(() => import('../Pages/EmailSorting/'));

/* function onAuthRequired({ history }) {
  history.push('/login');
} */

class AppMain extends Component {
  render() {
    return (
      <Fragment>
        {/* <Routes></Routes> */}
        {/*<Route path='/login' layout={{'content.fullPage': true}} render={() => <Login/>} />*/}
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      </Fragment>
    );
  }
}

export default AppMain;
