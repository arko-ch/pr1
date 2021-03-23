import React, { Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Store } from './store';
import ms from '../services/modal';
//docspring support 10/06
export function ModalContainer(props) {
  const store = React.useContext(Store);
  const state = store.state.modal;

  ms.useContext(store, store.setState);

  let actions = (state.actions || []).map((action, idx) => {
    return (
      <Button
        key={`mdl-btn-${action.idx}`}
        className="mr-1"
        color={action.color || 'primary'}
        onClick={() => {
          ms.onAction(action);
        }}
      >
        {action.title}
      </Button>
    );
  });
  let Content = state.content;

  return (
    <Fragment key="modal-container">
      <Modal
        className={`modal-${state.size}`}
        isOpen={state.show}
        toggle={() => {
          ms.hideModal();
        }}
      >
        <ModalHeader
          toggle={() => {
            ms.hideModal();
          }}
        >
          {state.title}
        </ModalHeader>
        {Content && <Content {...state} {...ms.model('modal.result')} />}
        {!Content && <ModalBody> {state.message} </ModalBody>}
        <ModalFooter>
          {actions}
          {state.closeText ? (
            <Button
              color="secondary"
              onClick={() => {
                ms.hideModal();
              }}
            >
              {state.closeText}
            </Button>
          ) : null}
          {/*JSON.stringify(state.result)*/}
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}

export { ms };
