import React, { Component } from 'react';
import './CSS/Login.css';
import slice1 from '../images/Slice1.png';
import './CSS/Common.css';
import Login from 'app/auth/Login';

class LoginContainer extends Component {
  render() {
    return (
      <html>
        <body>
          <div class="wrapper">
            <div class="innerWrapper">
              <div class="area-left">
                <img src={slice1} />
                <div class="fGalleryText">
                  <h3>entitled</h3>
                </div>
              </div>
              <div class="area-right">
                <Login />
                {/* <div class="formArea">
                  <h3>Sign Up</h3>
                  <form action="">
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Please enter email"
                        id="email"
                      />
                      <span class="errormsg">Invalid Email</span>
                    </div>
                    <div class="form-group">
                      <label for="pwd">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Please enter password"
                        id="pwd"
                      />
                      <span class="pwdShow">
                        <a href="">Show</a>
                      </span>
                      <span class="errormsg">Invalid Password</span>
                    </div>
                    <div class="form-group form-check mb-0">
                      <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" />{' '}
                        <span>Remember me</span>
                      </label>
                      <a href="" class="float-right">
                        Forgot your password?
                      </a>
                    </div>
                    <button class="btn" type="submit">
                      Sign in
                    </button>
                  </form>
                </div> */}
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

export default LoginContainer;
