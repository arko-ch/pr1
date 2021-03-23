import React, { Fragment, PureComponent } from 'react';
import {
  Button,
  Col,
  Collapse,
  Container,
  CustomInput,
  Row,
  UncontrolledTooltip,
  ButtonGroup
} from 'reactstrap';
import Loader from 'react-loaders';
import MessageItem from './MessasgeItem';

import { crud } from '../services/crud';
import events from '../services/events';
import ReplySection from './ReplySection';
import useInView from "react-cool-inview";
//pre- reactivesearch
export default class MessageList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      attachmentsia: [],
      selected: null,
      folder: props.folder || {},
      loading: false,
      next: null,
      convoItems: null
    };
    this.refresh = this.refresh.bind(this);
    this.$conv = crud('conversations');
    this.$root = events;
  }

  componentDidMount() {
    // this.fetchMessages();
    this.$root.$on('mail-refresh', this.refresh);
  }
  componentWillUnmount() {
    this.$root.$off('mail-refresh', this.refresh);
  }

  componentDidUpdate(prevProps) {
    //alert('props received',this.props.query)
    // if (this.props.query !== prevProps.query) {
    //   this.fetchMessages();
    // }
  }

 /*  UNSAFE_componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.folder && nextProps.folder.id !== this.state.folder.id) {
      this.setState({
        folder: nextProps.folder
      });
      setTimeout(() => {
        this.fetchMessages();
      });
    }
  } */

  async fetchConversationInfo(message) {
    if (message && message.conversationId) {
      let res = await this.$conv.find({
        conversationId_eq: message.conversationId
      });
      if (res && res.data) {
        return res.data[0];
      }
    }
  }

  async fetchMessages() {
    // return;

    const query = this.props.query;
    console.log('query >', query);
    console.log('fetch mesage props', this.props);
    if (
      'AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNAAuAAADqBCIigcO20iQywAELs4eVAEAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAA'
    ) {
      //console.log('loader true');
      this.setState({
        loading: true,
        messages: []
      });

      let res;
      if (query) {
        res = await this.$mail.getMessages(query);
        console.log(' res search result >', res);
        console.log(' folder >', this.state.folder);
        // localStorage.setItem('searchquery', JSON.stringify(res.data.messages.value)); //rawi0104
      } else {
        res = await this.$mail.getFolderMessages(
          'AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNAAuAAADqBCIigcO20iQywAELs4eVAEAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAA'
        ); //this.state.folder.id);
      }
      if (res.data.messages) {
        console.log('MESSAGE LIST', res.data);
        this.setState({
          messages: res.data.messages.value,
          next: res.data.messages['@odata.nextLink']
        });
      }

      //localStorage.setItem('searchquery', JSON.stringify(res.data.messages.value)); //rawi0104
    }

    this.setState({
      loading: false
    });
  }

  async fetchAttachmentsia(id) {
    let res = await this.$mail.getAttachmentsia(id);

    if (res.data.attachmentsia) {
      this.setState({
        attachmentsia: res.data.attachmentsia.value
      });
    }
    console.log(
      'Fetching inline Attachments >>' +
        JSON.stringify(this.state.attachmentsia)
    );
  }

  refresh() {
    this.fetchMessages();
  }

  async loadMore() {
    if (this.props.next && this.props.next.length > 0) {
      let res = await this.$mail.getNext(this.props.next);

      res = res.data;

      if (res.items) {
        this.setState({
          messages: [...this.props.messages, ...res.items.value],
          next: res.items['@odata.nextLink']
        });
      }

      //console.log(res);
    }
  }
  groupConvo() {
    let convos = {};
    this.props.messages.forEach(item => {
      if (convos[item.conversationId]) {
        convos[item.conversationId].push(item);
        window.itemid = item.id;
      } else {
        convos[item.conversationId] = [item];
      }
      //window.itemid=item.id
     // console.log('items in convo group ->>', item )
    });
    return convos;
  }

  onClick(message) {
    this.setState({
      selected: message.id
    });

    this.$root.$emit('mail-message', message);
  }

  render() {
    let convoItems = this.groupConvo();
   // console.log('convoItems',convoItems)
    let messageItems = [];
   // console.log('this props messagelist',this.props.messages)
    Object.keys(convoItems).map((key, idx) => {
      //console.log('push keys',convoItems)
      messageItems.push(
        <MessageItem
          groupedconvo={convoItems}
          isDropdownOpen={this.props.isDropdownOpen}
          toggleDropdown={this.props.toggleDropdown}
          newInfoData={this.props.newInfoData}
          convoId={key}
          idx={idx}
          key={idx}
          folder={this.state.folder}
          openedMessages={this.props.openedMessages}
          handleOpenMessage={this.props.handleOpenMessage}
          handleCloseMessage={this.props.handleCloseMessage}
        />
      );
    });

    if (messageItems.length <= 10) {
      this.loadMore();
    }

    return (
      <Fragment>
        <ul className="list-group w-100">
          {/*  <li className="list-group-item d-flex justify-content-between align-items-center">
            {' '}
            Messages
            <Button
              color="link"
              className="p-0"
              id="writenewmail"
              onClick={this.props.writeMail}
            ></Button>
            <UncontrolledTooltip placement="right" target="writenewmail">
              Write New Mail
            </UncontrolledTooltip>
          </li> */}
          {this.props.loading ? (
            <div>
              {/* <div className='d-flex flex-column align-items-center justify-content-center p-5'> */}{' '}
              <Loader className="mt-3" type="ball-pulse" /> Loading...{' '}
            </div>
          ) : (
            <>{messageItems}</>
          )}
          {this.props.next && this.props.next.length > 0 && (
            <button
              className="list-group-item"
              onClick={() => {
                this.loadMore();
              }}
            >
              More...
            </button>
          )}
          <button
            className="list-group-item"
            onClick={() => {
              this.refresh();
            }}
          >
            Refresh
          </button>
        </ul>

        {/* <div>
          <ReplySection />
        </div> */}
      </Fragment>
    );
  }
}
