import React, { Component } from 'react';
import EventEmitter from 'events';

const emitter = new EventEmitter();
emitter.setMaxListeners(200);

const broadcaster = {
  $on: function(evt, func) {
    emitter.on(evt, func);
  },

  $off: function(evt, func) {
    emitter.off(evt, func);
  },

  $emit: function(evt, func) {
    emitter.emit(evt, func);
  }
};

// todo .. remove
Component.prototype.$on = broadcaster.$on;
Component.prototype.$off = broadcaster.$off;
Component.prototype.$emit = broadcaster.$emit;
Component.prototype.$root = broadcaster;

export default broadcaster;
/*  useEffect(() => {
    setState(props);
}, [props]) */
  //console.log('FilterBar',props.value) //,props.meta,state.value)