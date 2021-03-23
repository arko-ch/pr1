import React, { Component } from 'react';
import Config from '../../../app/entitled/app/config/config';
import qs from 'qs';
import { format, addDays } from 'date-fns';
import $http from 'axios';
// const $root = Component.prototype.$root;
// const $http = Component.prototype.$http;

// import $root from '../services/events';
// import $http from '../services/http.js';

const entryPoint = Config.app.server.url + '/mail-outlook';

/**

router.get('/getdraft', (req, res, next) => {
router.post('/updatedraft/:id',  (req, res) => {
router.get('/contacts',  (req, res, next) => {
router.post('/seen/:id',  (req, res) => {
router.post('/saveemail/:id',  (req, res) => {
router.get('/attachment/:id',  (req, res, next) => {
router.post('/addattachment/:id',  (req, res, next) => {
router.post('/creply/:id',  (req, res, next) => {  
router.post('/dsend/:id',  (req, res, next) => {
router.post('/wreply',  (req, res, next) => {
router.post('/wupdatedraft/:id',  (req, res) => {
router.post('/ccwupdatedraft/:id',  (req, res) => {

*/

//class Search extends Component { => functional arrow changes //convert to functional componanent 08/24
class MailBox {
  async refreshAccessToken() {
    return await $http.get(entryPoint + '/?refresh=true');
  }

  async getFolders(result) {
    let res;
    if (result) {
      res = { data: result };
    } else {
      res = await $http.get(entryPoint + '/folders');
    }

    if (res) {
      res.data.folders.value.forEach(v => {
        if (/^junk/i.exec(v.displayName)) {
          this.junk = v;
        }
        if (/^inbox/i.exec(v.displayName)) {
          this.inbox = v;
        }
      });
    }

    // find inbox
    // find junk

    return res;
  }

  async getFolder(folderId) {
    return await $http.get(entryPoint + '/folders/' + folderId);
  }

  async getConvo(convoId) {
    let dateTom = addDays(new Date(), 1);
    let fDate = format(dateTom, 'YYYY-MM-DD');
    return await $http.get(
      entryPoint +
        '/messages?$filter=ReceivedDateTime le ' +
        fDate +
        " and conversationId eq '" +
        convoId +
        "' &$orderby=receivedDateTime desc"
    );
  }

  async getFolderMessages(folderId, query) {
    let q = '';
    if (query) {
      q = '?$search="' + query + '"';
    }
    return await $http.get(
      entryPoint + '/folders/' + folderId + '/messages' + q
    );
  }

  async getMessages(query) {
    let q = '';
    if (query) {
      q = '?$search="' + query + '"';
    }
    return await $http.get(entryPoint + '/messages' + q);
  }

  async moveMessage(message, destinationId) {
    console.log('reply...');
    return await $http({
      url: entryPoint + '/messages/' + message.id + '/move',
      method: 'post',
      data: {
        destinationId: destinationId
      }
    });
  }

  async getMessage(msgId) {
    return await $http.get(entryPoint + '/messages/' + msgId);
  }

  async getAttachments(msgId) {
    //console.log('ito yung ENTRY POINT',JSON.stringify($http.get(entryPoint + '/messages/' + msgId + '/attachments/?$expand=microsoft.graph.itemattachment/item')))
    return await $http.get(
      entryPoint +
        '/messages/' +
        msgId +
        '/attachments/?$expand=microsoft.graph.itemattachment/item'
    );
  }

  async getAttachmentsList(msgId) {
    //console.log('ito yung ENTRY POINT',JSON.stringify($http.get(entryPoint + '/messages/' + msgId + '/attachments/?$expand=microsoft.graph.itemattachment/item')))
    return await $http.get(entryPoint + '/messages/' + msgId + '/attachments');
  }

  async getAttachment(msgId, attachId) {
    return await $http.get(
      entryPoint + '/messages/' + msgId + '/attachments/' + attachId
    );
  }

  async getInLineAttachmentsa(msgId, attachId) {
    console.log(
      'mail services=> getInLineAttachmentsa' +
        'msgid->>' +
        msgId +
        '--attachedid-->' +
        attachId
    );
    //console.log('ito yung ENTRY POINT',JSON.stringify($http.get(entryPoint + '/messages/' + msgId + '/attachments/?$expand=microsoft.graph.itemattachment/item')))
    return await $http.get(
      entryPoint + '/messages/' + msgId + '/attachments/' + attachId //?$expand=microsoft.graph.itemattachment/item'
    );
  }

  /*  async kuninAttachment(msgId, attachId) {
    console.log('url=>',$http.get(entryPoint + '/messages/' + msgId + '/attachments/' + attachId))
    return await $http.get(
      entryPoint + '/messages/' + msgId + '/attachments/' + attachId
    ); 
  } */

  async saveAttachment(msgId, attachId, name, path) {
    return await $http({
      url: entryPoint + '/messages/' + msgId + '/attachments/' + attachId,
      method: 'post',
      data: {
        name: name,
        path: path
      }
    });
  }

  async reply(message) {
    console.log('reply... src/services/mail.js message==>', message);
    return await $http({
      url: entryPoint + '/messages/' + message.id + '/reply',
      method: 'post',
      data: {
        comment: message.body,
        attachments: message.attachments
      }
    });
  }

  async replyAll(message) {
    console.log('reply ALL... src/services/mail.js message==>', message);
    return await $http({
      url: entryPoint + '/messages/' + message.id + '/replyAll',
      method: 'post',
      data: {
        comment: message.body,
        attachments: message.attachments
      }
    });
  }

  async forward(message) {
    console.log('forward...');
    return await $http({
      url: entryPoint + '/messages/' + message.id + '/forward',
      method: 'post',
      data: {
        comment: message.body,
        toRecipients: [
          {
            emailAddress: {
              address: message.to
            }
          }
        ]
      }
    });
  }

  async write(message) {
    //console.log('write... in Mail.js==>>',message);

    return await $http({
      url: entryPoint + '/write',
      method: 'post',
      data: {
        address: message.to,
        addresscc: message.cc,
        body: message.body,
        subject: message.subject,
        attachments: message.attachments
      }
    });
  }

  async senddraft(msgId, message) {
    //console.log('write... in Mail.js==>>',message);

    return await $http({
      url: entryPoint + '/messages/' + msgId + '/senddraft',
      method: 'post'
    });
  }

  async writenoattached(message) {
    console.log('write... in Mail.js==>>', message);
    return await $http({
      url: entryPoint + '/writenoattached',
      method: 'post',
      data: {
        address: message.to,
        addresscc: message.cc,
        body: message.body,
        subject: message.subject
        //,
        //attachments:message.attachments
      }
    });
  }
  //addAttachment

  async addAttachment(msgId, message) {
    console.log('addAttachment...', message);
    return await $http({
      url: entryPoint + '/messages/' + msgId + '/addAttachment',
      method: 'post',
      data: message
    });
  }

  async createReply(msgId, message) {
    console.log('MAIL create reply', message);
    let draftmsg = message;
    return await $http({
      url: entryPoint + '/messages/' + msgId + '/createReply',
      method: 'post',

      data: {
        body: message
      }
    });
  }

  async draft(message) {
    //  console.log('draft...',message);
    return await $http({
      url: entryPoint + '/draft',
      method: 'post',
      data: {
        address: message.to,
        addresscc: message.cc,
        body: message.body,
        subject: message.subject
      }
    });
  }

  async getNext(next) {
    return await $http.get(
      entryPoint +
        '/next?' +
        qs.stringify({
          url: next
        })
    );
  }

  /*  async writeintcoms(message) {
    console.log(
      'writeintcoms... msgid->>' +
        message.id +
        '====writeintcoms====>' +
        message.comsInternal
    );
    return await $http({
      url: entryPoint + '/messages/' + message.id + '/extensions/',
      method: 'post',

      data: {
        '@odata.type': '#microsoft.graph.openTypeExtension',
        extensionName: 'Com.Settlementapp99.Comment',
        comsInternal: message.comsInternal
      }
    });
  } */

  async getIntcoms(msgId) {
    return await $http.get(
      entryPoint +
        '/messages/' +
        msgId +
        '/extensions/' +
        'Com.Settlementapp99.Comment'
    );
  }

  async getBubbles(msgId) {
    return await $http.get(
      entryPoint +
        '/messages/' +
        msgId +
        '/extensions/' +
        'Com.Settlementapp99.Bubble'
    );
  }

  async getAvatars(msgId) {
    return await $http.get(
      entryPoint +
        '/messages/' +
        msgId +
        '/extensions/' +
        'Com.Settlementapp99.Viewers'
    );
  }

  async getConvmsgid(msgId) {
    return await $http.get(
      entryPoint +
        `/messages/?$filter=ConversationId eq ` +
        `'` +
        msgId +
        `'` +
        'and hasAttachments eq true'
    );
  }

  async getToken(msgId) {
    return await $http.get(entryPoint + '/getAccessToken');
  }

  async kuninInlineatta(msgId, attachId) {
    console.log(
      'mail services=> kuninmethod' +
        'msgid->>' +
        msgId +
        '--attachedid-->' +
        attachId
    ); //'ito yung ENTRY POINT',JSON.stringify($http.get(entryPoint + '/messages/' + msgId + '/attachments/?$expand=microsoft.graph.itemattachment/item')))
    return await $http.get(
      entryPoint +
        '/messages/' +
        msgId +
        '/attachments' +
        attachId +
        '/?$expand=microsoft.graph.itemattachment/item'
    );
  }

  async viewers(message) {
    // console.log(      'viewers... msgid->>' +      JSON.stringify(message.comsInternal) +        '====viewers====>' +        message.comsInternal    );
    return await $http({
      url: entryPoint + '/messages/' + message.id + '/extensions',
      method: 'post',

      data: {
        '@odata.type': '#microsoft.graph.openTypeExtension',
        extensionName: 'Com.Settlementapp99.Viewers',
        viewers: message.comsInternal
      }
    });
  }

  /*  async viewers(msgId) {
    return await $http.get(
      entryPoint +
        '/messages/' +
        msgId +
        '/extensions/' +
        'Com.Settlementapp99.Viewers'
    );
  } */
}

const $mail = new MailBox();

window.$mail = $mail;
Component.prototype.$mail = $mail;

export default $mail;
