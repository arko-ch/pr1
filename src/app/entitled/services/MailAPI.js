import Config from '../app/config/config';
import $http from '../../entitled/services/http';
import React from 'react';

function MailAPI() {
  function reply() {
    alert('Reply');
  }
  /* const reply(message) => {
        console.log('reply... src/services/mail.js message==>',message);
        return await $http({
          url: entryPoint + '/messages/' + message.id + '/reply',
          method: 'post',
          data: {
            comment: message.body
          }
        });
      } */

  return <div></div>;
}

export default MailAPI;
