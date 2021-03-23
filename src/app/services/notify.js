import React, { Component } from 'react';
import { Bounce, toast } from 'react-toastify';

class SimpleNotify {
  notify(msg, params) {
    let p = Object.assign(
      {
        transition: Bounce,
        closeButton: true,
        autoClose: 2000,
        position: 'bottom-center',
        type: 'success'
      },
      params
    );
    this.toastId = toast(msg, p);
  }
}

const notify = new SimpleNotify();
export default notify;
