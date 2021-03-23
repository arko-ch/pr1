import React from 'react';
import StateHelper from '../services/stateHelper';
import events from '../services/events';

class ModalState extends StateHelper {
  constructor() {
    super();
  }

  _paramsToModal(params) {
    //console.log('modal',params)
    let modalParams = {};
    Object.keys(params).forEach(k => {
      modalParams[`modal.${k}`] = params[k];
    });
    //console.log('modalParams',modalParams)
    return modalParams;
  }

  hideModal() {
    this.setState(
      this._paramsToModal({
        show: false,
        title: null,
        message: '',
        actions: null,
        size: null,
        content: null
      })
    );
  }

  onAction = action => {
    if (action.action) {
      action.action(this.state().modal.result);
    }
    if (action.emit) {
      events.$emit(action.emit, this.state().modal.result);
    }
    this.hideModal();
  };

  confirm = params => {
    params.show = true;
    if (params.closeText === undefined) {
      params.closeText = 'Cancel';
    }
    this.setState(this._paramsToModal(params));
  };

  show = params => {
    params.show = true;
    this.confirm(params);
  };
}

const ms = new ModalState();

export default ms;
