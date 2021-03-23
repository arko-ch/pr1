import React from 'react';

import ChatBubble from '../app/chat/components/ChatBubble';
import ChatBox from '../app/chat/components/ChatBox';

import '../assets/_App.css';
import '../Test.scss';

export default { title: 'Chat Stories' };
/*
// TODO: deprecate the entire thing... use /app/services
*/

function ChatState(props) {
  const [state, setState] = React.useState({
    who: 0,
    message: '',
    messages: [
      {
        author: 'Marvin',
        body: 'Hello'
      },
      {
        author: 'Someone Else',
        body: 'Hello Also'
      }
    ]
  });

  const isLoading = false;
  const users = [
    { name: 'Marvin', avatar: '' },
    { name: 'Someone Else', avatar: '' }
  ];

  const user = users[state.who ? 0 : 1] || {};

  const onChange = evt => {
    setState({
      ...state,
      message: evt.target.value
    });
  };

  const onSubmit = () => {
    if (state.message === '') {
      return;
    }

    setState({
      ...state,
      messages: [
        ...state.messages,
        {
          author: user.name,
          body: state.message
        }
      ],
      message: ''
    });
  };

  const onKeyDown = evt => {
    if (evt.key === 'Enter') {
      onSubmit();
    }
    if (evt.key === 'Alt') {
      setState({
        ...state,
        who: !state.who
      });
    }
  };

  return (
    <div>
      <ChatBox
        message={state.message}
        messages={state.messages}
        user={user}
        onKeyDown={onKeyDown}
        onSubmit={onSubmit}
        onChange={onChange}
      />
    </div>
  );
}

export const chatBubble = () => {
  return (
    <div className="p-4">
      <div className="chat-box-container">
        <div className="chat-box-msgs">
          <ChatBubble
            right={true}
            message={{
              author: {
                name: 'Marvin',
                avatar: ''
              },
              body: 'hello bubble'
            }}
          />
          <ChatBubble
            right={false}
            message={{
              author: {
                name: 'Marvin',
                avatar: ''
              },
              body: 'hello bubble'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const chat = () => {
  return <ChatState />;
};
