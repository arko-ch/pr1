import React, { Component } from 'react';
import { Bounce, Slide, toast } from 'react-toastify';

const Level = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

const Transition = {
  SLIDE: Slide,
  BOUNCE: Bounce
};

class SimpleNotify {
  show(msg, level, position = 'bottom-center', params) {
    let p = Object.assign(
      {
        transition: Slide,
        closeButton: true,
        autoClose: 5000,
        position: position,
        type: level
      },
      params
    );

    this.toastId = toast(msg, p);
    console.log('notify', params.conversationId);
  }
}

const Toast = new SimpleNotify();
export default { Toast, Level, Transition };
