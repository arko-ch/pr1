import React from 'react';

export default function(props) {
  const message = props.message;
  const channel = message.channel;
  const author = message.author;
  const avatar = author.avatar;
  const right = props.right;

  return (
    <div className={'user-chat-container  user-chat-container-' + right}>
      <img width={42} className="rounded-circle" src={avatar} alt="" />
      <div className={'message-box-container message-box-container-' + right}>
        <small>{author.name}</small>
        <div className={'message-box message-box-' + right}>
          <span className="chat-message">{message.body}</span>
        </div>
      </div>
    </div>
  );
}
