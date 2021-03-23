import React, { Component } from 'react';
import Chat from 'twilio-chat';
import Config from '../../config/config';
import $http from './http';

const ChatState = {
  channelName: 'general2', // current channel name
  channel: null, // current channel
  client: null,
  channels: {},
  token: null,
  username: ''
};

const chatCacheKey = 'twilio-chat-' + ChatState.channelName;

class ChatService {
  constructor() {
    this.chatState = ChatState;
  }

  handleError(err) {
    console.log(err);
  }

  messagesLoaded(msgs) {
    // override //
  }

  messageAdded(msg) {
    // override me
  }

  async bootstrap() {
    // acquire client & channel
    try {
      ChatState.token = (await this.acquireChatToken()).token;
      ChatState.client = await this.setupClient();
      ChatState.channel = await this.setupChatChannel();
      ChatState.channels[ChatState.channelName] = ChatState.channel;

      let channel = ChatState.channel;
      channel = ChatState.channel;
      channel
        .join()
        .then(() => {})
        .catch(() => {});
      channel.on('messageAdded', msg => {
        this.messageAdded(msg);
      });

      //this.loadMessages();
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

  setupChatChannel(name) {
    return ChatState.client
      .getChannelByUniqueName(name || ChatState.channelName)
      .then(channel => {
        return channel;
      })
      .catch(error => {
        if (error.body.code === 50300) {
          return ChatState.client.createChannel({
            uniqueName: name || ChatState.channelName
          });
        } else {
          this.handleError(error);
        }
      });
  }

  loadMessages() {
    let channel = ChatState.channel;
    return channel.getMessages().then(msgs => {
      this.messagesLoaded(msgs);
    });
  }

  sendMessage(msg) {
    let channel = ChatState.channel;
    channel.sendMessage(msg);
  }
}

const chatService = new ChatService();

export default chatService;
