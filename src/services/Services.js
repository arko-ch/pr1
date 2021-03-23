/*
// TODO: deprecate the entire thing... use /app/services
*/

/*
import React, { Component } from 'react';
import './Events';
import $crud, { Crud as crud } from './Crud';
// import $cache, { Cache as cache } from './Cache';
import $http, { Http as http } from './Http';
import $notify, { Notify as notify } from './Notify';
// import $modal, { ModalService as modal } from './Modal';
import './Model';
// import './History';
import './Utility';
import './Chat';
import './File';
import './Mail';
import './Clipboard';
import Config from '../config/config';

export default function withServices(Component, services) {
  let props = {};

  services.forEach(s => {
    let service = s();
    Object.keys(service).forEach(sk => {
      props[sk] = service[sk];
    });
  });

  console.warn(
    'withServices is deprecated ' + JSON.stringify(Object.keys(props))
  );

  return class extends React.Component {
    render() {
      return <Component {...this.props} {...props} />;
    }
  };
}
*/

// export const Crud = crud;
// export const Cache = cache;
// export const Http = http;
// export const Notify = notify;
// export const Modal = modal;
// export const File = File;

// Component.prototype.$config = Config;
