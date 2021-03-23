/*
// TODO: deprecate the entire thing... use /app/services
*/

import React, { Component } from 'react';
import Chat from 'twilio-chat';
import Config from '../config/config';

const ChatState = {
  channelName: 'general2',
  client: null,
  channel: null,
  token: null,
  username: ''
};

const chatCacheKey = 'twilio-chat-' + ChatState.channelName;

const $root = Component.prototype.$root;
const $http = Component.prototype.$http;

class ChatService {
  constructor() {
    this.state = {
      items: []
    };
    this.chatState = ChatState;
  }

  handleError(err) {
    console.log(err);
  }

  messagesLoaded(msgs) {
    this.state = {
      ...this.state,
      ...msgs
    };
    $root.$emit('chat-messages', msgs);
  }

  messageAdded(msg) {
    this.state.items = [...this.state.items, msg];
    $root.$emit('chat-message', msg);
  }

  async bootstrap() {
    // acquire client & channel
    try {
      ChatState.token = (await this.acquireChatToken()).token;
      ChatState.client = await this.setupClient();
      ChatState.channel = await this.setupChatChannel();

      this.channel = ChatState.channel;
      this.channel
        .join()
        .then(() => {})
        .catch(() => {});
      this.channel.on('messageAdded', msg => {
        this.messageAdded(msg);
      });

      this.loadMessages();
    } catch (err) {
      console.log(err);
    }
  }

  acquireChatToken() {
    let username = ChatState.username;
    return $http({
      method: 'post',
      url:
        Config.app.server.url + `/chat-twilio/chat/token/?identity=${username}`
    }).then(res => {
      return res.data;
    });
  }

  setupClient() {
    return Chat.create(ChatState.token);
  }

  setupChatChannel() {
    return ChatState.client
      .getChannelByUniqueName(ChatState.channelName)
      .then(channel => {
        return channel;
      })
      .catch(error => {
        if (error.body.code === 50300) {
          return ChatState.client.createChannel({
            uniqueName: ChatState.channelName
          });
        } else {
          this.handleError(error);
        }
      });
  }

  loadMessages() {
    this.channel.getMessages().then(msgs => {
      this.messagesLoaded(msgs);
    });
  }

  sendMessage(msg) {
    this.channel.sendMessage(msg);
  }
}

const chatService = new ChatService();

Component.prototype.$chat = chatService;
window.$chat = chatService;

$root.$on('user-authenticated', function(user) {
  if (user && user.user && user.user.name) {
    ChatState.username = user.user.name;
    chatService.bootstrap();
  }
});
