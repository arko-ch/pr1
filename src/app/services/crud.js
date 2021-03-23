import React, { Component } from 'react';
import $http from './http';
import config from '../../config/config';

class CrudModel {
  constructor(model) {
    this.model = model;
    this.signal = $http.CancelToken.source();
  }

  findOne(id) {
    return $http({
      method: 'get',
      url: config.app.server.url + `/${this.model}/${id}`,
      cancelToken: this.signal.token
    })
      .then(res => {
        // console.log(res)
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  findOneDocId(id) {
    return $http({
      method: 'get',
      url: config.app.server.url + `/${this.model}?documentId=${id}`,
      cancelToken: this.signal.token
    })
      .then(res => {
        // console.log(res)
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  save(doc) {
    let method = doc._id ? 'put' : 'post';
    //    console.log('save doc',doc,method)
    let url =
      config.app.server.url + `/${this.model}` + (doc._id ? '/' + doc._id : '');
    return $http({
      method: method,
      url: url,
      data: doc,
      cancelToken: this.signal.token
    })
      .then(res => {
        //console.log('from CRUD',res.data);
        if (!res.data._id) {
          return Promise.reject(res);
        }
        return Promise.resolve(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  erase(id) {
    return $http({
      method: 'delete',
      url: config.app.server.url + `/${this.model}/${id}`,
      cancelToken: this.signal.token
    })
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  findOnePropertyId(id) {
    return $http({
      method: 'get',
      url: config.app.server.url + `/${this.model}?propertyId=${id}`,
      cancelToken: this.signal.token
    })
      .then(res => {
        // console.log('res findOnePropertyId',res)
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  findCommitmentDetails(id) {
    return $http({
      method: 'get',
      url: config.app.server.url + `/${this.model}?code=${id}`,
      cancelToken: this.signal.token
    })
      .then(res => {
        // console.log('res findOnePropertyId',res)
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  find(params = {}) {
    //    console.log('crud find params',params)
    const query = params;
    query._limit = query._limit || 50;
    query._start = query._start || 0;

    if (query._page) {
      query._start = query._page * query._limit;
      delete query._page;
    }

    // let keyword = params.value
    // let m = /[A-Z]-([0-9]*)-[0-9]{1,2}/.exec(keyword)
    // if (m && m[1]) {
    //   keyword = m[1]
    // }
    // if (params.match) {
    //   var keys = Object.keys(params.match) || []
    //   keys.forEach(f => {
    //     query[f] = params.match[f]
    //   })
    // }

    //console.log(query);

    return $http
      .get(config.app.server.url + `/${this.model}`, {
        params: query,
        cancelToken: this.signal.token
      })
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  cancel(reason) {
    this.signal.cancel(reason);
  }
}

export function crud(model) {
  return new CrudModel(model);
}
