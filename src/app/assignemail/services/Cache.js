import React, { Component } from 'react';
import config from '../../../app/entitled/app/config/config';
class SimplePersist {
  constructor(storage) {
    this.storage = storage;
    this.key = config.app.id || 'app-simple-storage';
    this.data = {};
    if (this.storage) {
      this.data = JSON.parse(this.storage.getItem(this.key, '{}')) || {};
    }
  }

  setItem(key, value) {
    this.data[key] = value;
    this.storage.setItem(this.key, JSON.stringify(this.data));
  }
}

class SimpleCache {
  constructor(storage) {
    this.persist = new SimplePersist(storage);
    this.cache = this.persist.data;
    this.expire();
  }

  put(key, data, opts) {
    let _data = {
      key: key,
      data: data,
      opts
    };

    this.cache[key] = _data;
    if (opts) {
      if (opts.persist) {
        this.persist.setItem(key, _data);
      }
    }
  }

  get(key, defaultData) {
    if (!this.cache[key]) {
      return defaultData;
    }
    return this.cache[key].data || defaultData;
  }

  clear(key) {
    // todo clear perists
    if (key == null) {
      Object.keys(this.cache).forEach(k => {
        delete this.cache[k];
      });
      return;
    }
    delete this.cache[key];
  }

  expire() {}

  request(key, requestFunc, opts) {
    if (this.cache[key] && this.cache[key].data) {
      return Promise.resolve(this.cache[key].data);
    }
    return requestFunc().then(res => {
      this.put(key, res.data, opts);
      return Promise.resolve(res.data);
    });
  }
}

const cache = new SimpleCache(window.localStorage);
export const session = new SimpleCache(window.sessionStorage);
export default cache;
/*  useEffect(() => {
    setState(props);
}, [props]) */
//console.log('FilterBar',props.value) //,props.meta,state.value)
