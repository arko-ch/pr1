import React, { Component } from 'react';
import qs from 'qs';

import config from '../../config/config';
import http from './http.js';
// import cache, { session } from '../../@ashlar/services/cache.js';

const entryPoint = config.app.server.url + '/mail-outlook';

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
12-14 ignore /prime
*/

class Mail {
  async refreshAccessToken() {
    return await http.get(entryPoint + '/?refresh=true');
  }

  setFolders(folders) {
    folders.value.forEach(v => {
        // find inbox
        if (/^junk/i.exec(v.displayName)) {
          this.junk = v;
        }
        // find junk
        if (/^inbox/i.exec(v.displayName)) {
          this.inbox = v;
        }
      });
    this.folders = folders;
  }

  async getFolders() {
    let res = await http.get(entryPoint + '/folders');
    if (res) {
      this.setFolders(res.data.folders);
    }
    // console.log(res);
    return res;
  }

  async getFolder(folderId) {
    return await http.get(entryPoint + '/folders/' + folderId);
  }

  async getFolderMessages(folderId, query) {
    let q = '';
    if (query) {
      q = '?$search="' + query + '"';
    }
    return await http.get(
      entryPoint + '/folders/' + folderId + '/messages' + q
    );
  }

  async getMessages(query) {
    let q = '';
    if (query) {
      q = '?$search="' + query + '"';
    }
    return await http.get(entryPoint + '/messages' + q);
  }

  async moveMessage(message, destinationId) {
    console.log('reply...');
    return await http({
      url: entryPoint + '/messages/' + message.id + '/move',
      method: 'post',
      data: {
        destinationId: destinationId
      }
    });
  }

  async getMessage(msgId) {
    return await http.get(entryPoint + '/messages/' + msgId);
  }

  async getAttachments(msgId) {
    return await http.get(entryPoint + '/messages/' + msgId + '/attachments');
  }

  async getAttachmentsList(msgId) {
    return await http.get(entryPoint + '/messages/' + msgId + '/attachments');
  }

  async getAttachmentsia(msgId) {
    return await http.get(entryPoint + '/messages/' + msgId + '/attachments');
  }

  async getAttachment(msgId, attachId) {
    return await http.get(
      entryPoint + '/messages/' + msgId + '/attachments/' + attachId
    );
  }

  async getIntcoms(msgId) {
    return await http.get(
      entryPoint + '/messages/' + msgId + '/extensions/' + 'Com.Settlementapp99.Comment'
    );
  }

  async getConvmsgid(msgId) {
    return await http.get(
      entryPoint + `/messages/?$filter=ConversationId eq ` + `'`+msgId +`'` + 'and hasAttachments eq true'
    );
  }

  async saveAttachment(msgId, attachId, name, path) {
    return await http({
      url: entryPoint + '/messages/' + msgId + '/attachments/' + attachId,
      method: 'post',
      data: {
        name: name,
        path: path
      }
    });
  }

  async reply(message) {
    console.log('reply... src/services/mail.js');
    return await http({
      url: entryPoint + '/messages/' + message.id + '/reply',
      method: 'post',
      data: {
        comment: message.body
      }
    });
  }

  async forward(message) {
    console.log('forward...');
    return await http({
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
    console.log('write...');
    return await http({
      url: entryPoint + '/write',
      method: 'post',
      data: {
        address: message.to,
        body: message.body,
        subject: message.subject
      }
    });
  }

  async getNext(next) {
    return await http.get(
      entryPoint +
        '/next?' +
        qs.stringify({
          url: next
        })
    );
  }
}

export const mail = new Mail();

window.$mail = mail;
Component.prototype.$mail = mail;
