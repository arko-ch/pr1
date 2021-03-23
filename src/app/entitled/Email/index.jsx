import React, { useState } from 'react';
import EmailTabs from './EmailTabs';
import EmailContent from './EmailContent';
import EmailItem from './EmailItem';
const axios = require('axios');

const Email = () => {
  const [activeTab, setActiveTab] = useState(1);
  /* let sikret;
  sikret = encodeURIComponent('RY0ljep6ogy6ouKE4REJMxLCC9oxgJ1iolX3/++LNro=');
  axios
    .post(
      `https://cors-anywhere.herokuapp.com/https://login.microsoftonline.com/9f066f72-168e-4bdb-b544-a622c6a188e0/oauth2/token`,
      `grant_type=client_credentials&client_id=7d3aad3c-cdc9-4332-ba51-116a76cb0609&client_secret=${sikret}&resource=https://graph.microsoft.com`
    )

    .then(res => localStorage.setItem('access_token', res.data.access_token))
    .catch(error => {
      console.error(error.response);
    }); */

  const tabs = [
    { label: 'Inbox', value: 1, badge: null },
    { label: 'All', value: 2, badge: 21 },
    { label: 'New', value: 3, badge: 6 }
  ];
  return (
    <>
      {/*       <EmailTabs
        emailTabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      /> */}
      <EmailContent
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
};

export default Email;
