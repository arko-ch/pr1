import React, { PureComponent } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import OktaAuth from '@okta/okta-auth-js';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { Row, Col } from 'reactstrap';
//import { Redirect, withRouter } from 'react-router-dom';//rawi0713
import { withRouter } from 'react-router-dom'; ////rawi0713

import config from '../../config/config.js';
import $http from '../services/http';

const oktaConfig = config.auth.okta;
class _LoginWidget extends PureComponent {
  componentDidMount() {
    console.log('login widget..');
    const el = document.querySelector('#loginBox');

    this.widget = new OktaSignIn({
      baseUrl: oktaConfig.url
    });

    this.widget.renderEl(
      {
        el
      },
      this.onSuccess,
      this.onError
    );

    this.auth = new OktaAuth({
      url: oktaConfig.url,
      issuer: oktaConfig.issuer,
      clientId: oktaConfig.client_id
    });
  }

  async verifyToken(token) {
    try {
      let res = await $http.get(
        config.app.server.url + '/auth-okta/verify?token=' + token
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  onSuccess = res => {
    console.log('success');
    console.log(res);

    this.auth.token
      .getWithoutPrompt({
        clientId: oktaConfig.client_id,
        redirectUri: oktaConfig.redirect_uri,
        responseType: ['id_token', 'token'],
        scopes: oktaConfig.scopes,
        sessionToken: res.session.token
      })
      .then(async tokenOrTokens => {
        let idToken = tokenOrTokens[0].idToken;
        let accessToken = tokenOrTokens[1].accessToken;
        let sessionToken = res.session.token;
        let claims = res.user;
        let verify = (await this.verifyToken(idToken)) || {};

        const user = {
          user: verify.user,
          jwt: verify.jwt,
          provider: {
            provider: 'okta',
            idToken,
            accessToken,
            sessionToken,
            claims
          }
        };

        this.props.onLogin(user);
        setTimeout(() => {
          this.props.history.push('/');
        }, 250);

        // return this.props.auth.redirect({sessionToken: res.session.token});
      })
      .catch(err => {
        console.log(err);
        this.onError();
      });
  };

  onError = err => {
    console.log('error');
    console.log(err);
  };

  componentWillUnmount() {
    if (this.widget) {
      this.widget.remove();
    }
  }

  render() {
    return (
      <Row>
        <Col
          lg="9"
          md="10"
          sm="12"
          className="mx-auto app-login-box"
          id="loginBox"
        ></Col>
      </Row>
    );
  }
}

export default withRouter(_LoginWidget);

// export default function(props) {
//   return <div> Login </div>;
// }

// export default _LoginWidget;
//password expiration support - self service change password
