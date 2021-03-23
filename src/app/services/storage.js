import React, { Component } from 'react';
import Config from '../../config/config';
import qs from 'qs';

import $http from './http';

// const $http = Component.prototype.$http;
const entryPoint = Config.app.server.url + '/storage';

const provider = {
  list: directory => {
    return $http
      .get(entryPoint, {
        params: {
          path: directory
        }
      })
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log(err);
      });
  },

  download: path => {
    window.open(entryPoint + '?path=' + path);
  },

  upload: (file, params) => {
    var formData = new FormData();
    formData.append('file', file);

    return $http({
      method: 'post',
      url: entryPoint,
      data: formData,
      params: {
        path: params.path
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function(progressEvent) {
        if (params.onUploadProgress) {
          let progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          params.onUploadProgress(progressEvent, progress);
        }
      }
    })
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log(err);
      });
  },

  mkdir: params => {
    return $http({
      method: 'post',
      url: entryPoint,
      data: {
        type: 'create',
        path: params.path
      }
    })
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log(err);
      });
  },

  remove: params => {
    // { files: [ { path: 'xxx' }] }
    let p = qs.stringify(params);
    console.log(p);
    return $http({
      method: 'delete',
      url: entryPoint + '?' + p
    })
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log(err);
      });
  },

  copy: params => {}
};

export default provider;
