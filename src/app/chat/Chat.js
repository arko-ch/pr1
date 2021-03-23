import React from 'react';
import { Store as UserStore } from '../auth/store';
import { Store as ChatStore } from './store';
import ChatService from '../services/chat';
import ChatBox from './components/ChatBox';

export default function(props) {
  const [state, setState] = React.useState({
    message: ''
  });

  const chatStore = React.useContext(ChatStore);
  const userStore = React.useContext(UserStore);

  const messagesLoaded = msgs => {
    let newState = { ...chatStore.state };

    msgs.items.forEach(msg => {
      let channel = msg.channel.state.uniqueName;
      newState[channel] = newState[channel] || {};
      newState[channel].messages = [
        ...(newState[channel].messages || []),
        {
          sid: msg.sid,
          author: msg.author,
          body: msg.body
        }
      ];
    });

    newState.loaded = true;
    chatStore.dispatch(chatStore.setState(newState));
  };

  const messageAdded = msg => {
    let channel = msg.channel.state.uniqueName;
    chatStore.dispatch(
      chatStore.setState({
        [`${channel}.messages`]: {
          $push: {
            sid: msg.sid,
            author: msg.author,
            body: msg.body
          }
        }
      })
    );
  };

  const user = userStore.state.user || {};

  React.useEffect(() => {
    if (ChatService.chatState.username != userStore.state.user.username) {
      ChatService.chatState.username = userStore.state.user.username;
      ChatService.messageAdded = messageAdded;
      ChatService.messagesLoaded = messagesLoaded;

      chatStore.setState({
        ...chatStore.state,
        loaded: false
      });

      ChatService.bootstrap();
    }
  }, [ChatService.chatState.username]);

  const channelState = chatStore.state[ChatService.chatState.channelName] || {};

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

    ChatService.sendMessage(state.message);

    setState({
      message: ''
    });
  };

  const onKeyDown = evt => {
    if (evt.key === 'Enter') {
      onSubmit();
    }
  };

  if (!chatStore.state.loaded) {
    return <div className="m-4">Loading...</div>;
  }

  return (
    <ChatBox
      user={{ name: user.username }}
      message={state.message}
      messages={channelState.messages}
      onKeyDown={onKeyDown}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
}
