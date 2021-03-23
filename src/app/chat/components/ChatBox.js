import React, { Fragment } from 'react';
import Loader from 'react-loaders';
import PerfectScrollbar from 'react-perfect-scrollbar';

import ChatBubble from './ChatBubble';

export default function ChatBox(props) {
  const user = props.user;
  const isLoading = props.loading;
  const messages = props.messages || [];
  //const message = props.message;

  const onChange = props.onChange || (() => {});
  const onKeyDown = props.onKeyDown || (() => {});
  const onSubmit = props.onSubmit || (() => {});

  let msgs = messages.map((item, idx) => {
    return (
      <ChatBubble
        key={idx + '__' + item.sid}
        message={{
          body: item.body,
          author: {
            name: item.author,
            avatar: ''
          },
          channel: item.channel
        }}
        right={user.name === item.author}
      />
    );
  });

  setTimeout(() => {
    let container = document.querySelector(
      '.chat-box-msgs .scrollbar-container.ps'
    );
    if (container) {
      container.scrollTo(0, 99999);
    }
  }, 50);

  const style = {
    width: '300px',
    height: '100%',
    marginTop: '0px',
    paddingTop: '0px'
  };

  return (
    <div>
      <div className="chat-box-container" style={style}>
        {isLoading && (
          <Fragment>
            <div className="loader">
              <Loader type="line-scale-party" />
            </div>
          </Fragment>
        )}
        {!isLoading && (
          <div className="chat-box-msgs">
            <PerfectScrollbar>{msgs}</PerfectScrollbar>
          </div>
        )}
        {!isLoading && (
          <div className="chat-box-input-container" style={{ width: '260px' }}>
            <input
              className="form-control"
              placeholder="Type your message"
              type="text"
              value={props.message}
              onChange={onChange}
              onKeyDown={onKeyDown}
            />
            {/*
            <button onClick={onSubmit} className="btn btn-primary">
              Send
            </button>
          */}
          </div>
        )}
      </div>
    </div>
  );
}
