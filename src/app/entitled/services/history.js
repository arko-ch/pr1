import React, { Component } from 'react';

class History {
  constructor() {
    this.popTwo = true;
    this.historyStack = [];
  }

  count() {
    return this.historyStack.length;
  }

  clear() {
    this.historyStack = [];
    this.popTwo = true;
  }

  push(data) {
    this.historyStack.push(JSON.stringify(data));
    this.popTwo = true;
  }

  pop(data) {
    if (!this.historyStack.length) {
      return null;
    }
    if (this.popTwo) {
      this.historyStack.pop();
      this.popTwo = false;
    }
    var djson = JSON.stringify(data);
    var value = this.historyStack.pop();
    if (value) {
      if (value === djson) {
        value = this.historyStack.pop();
      }
      if (value) {
        var obj = JSON.parse(value);
        if (typeof obj === 'object') {
          return obj;
        }
      }
      return null;
    }
  }
}

const $history = new History();

export default $history;

// Component.prototype.$history = $history;
