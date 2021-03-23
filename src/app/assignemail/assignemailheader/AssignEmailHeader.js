import React from 'react';
import './assignemailheader.scss';
import logo from './../../../assets/images/logo-header.svg';
import message from './../../../assets/images/message.svg';
import search from './../../../assets/images/search.svg';
import outerbox from './../../../assets/images/outerbox.svg';
import logout from './../../../assets/images/logout.svg';

function AssignEmailHeader() {
  return (
    <div className="assing_email_header">
      <img className="img_logo" src={logo} alt="logo" />
      <div className="header_right_section">
        <img className="mail" src={message} />
        <img src={search} />
        <img src={outerbox} />
        <img src={logout} />
      </div>
    </div>
  );
}

export default AssignEmailHeader;
