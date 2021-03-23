import React, { Fragment, PureComponent } from 'react';
import {
  Row,
  Col,
  Badge,
  Button,
  UncontrolledTooltip,
  Table
} from 'reactstrap';
import AttachmentList from './AttachmentList';
import Moment from 'react-moment';
import cache from '../services/cache';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';
//import openSocket from 'socket.io-client';
import MessageComment from './Components/MessageComment';
//import MessageComment2 from './Components/MessageCommentv2'
import { crud } from '../../services/crud'; //'../../../../app/services/crud'
import EmailMessageBox from '././EmailMessageBox';
import EmailComment from './EmailComment';
import { TrackingContext } from 'treacker';
import MessageContainer from './MessageContainer';
const $mail = crud('mail');
//const socket = openSocket('http://dev.settlementapp99.com');
//pre- reactivesearch
const axios = require('axios');
let _persistentState = null;
export default class Message extends PureComponent {
  state = {
    update: 'no'
  };

  constructor(props) {
    super(props);

    this.state = {
      ...(props || {}),
      attachmentsia: '',
      inline_att: [],
      childVisible: false,
      expanded: {},
      activeCollapse: '',
      mounttoken: 0,
      writeindicator: false,
      commentsocket: {},
      chatboxbubblecolor: '#e0f3ff',
      isHidden: false,
      //chatStatus:'',
      chatStatus: this.props.messages.map(e => false),
      showComment: false,
      commentIndex: null,
      activeReply: false,
      activeReplyAll: false
    };

    this.$cache = cache;
    this.fetchAttachmentsia = this.fetchAttachmentsia.bind(this);
    this.bubbleColor = this.bubbleColor.bind(this);
    this.csschatHighlight = this.csschatHighlight.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
  }

  componentDidMount() {
    //console.log('this.props.messages for replacement new layout',this.props.messages)
    //console.log('this state chat status mount ==>>',this.state.chatStatus)
    if (localStorage.getItem('access_token') === null) {
    } else {
    }
  }

  toggleHidden() {
    //alert(this.state.isHidden)
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  async themount() {
    if (this.state.mounttoken === 0) {
    } else {
    }

    await this.setState({
      mounttoken: 1
    });
  }
  async paxioska() {
    let sikret;
    sikret = encodeURIComponent('RY0ljep6ogy6ouKE4REJMxLCC9oxgJ1iolX3/++LNro=');
    axios
      .post(
        `https://cors-anywhere.herokuapp.com/https://login.microsoftonline.com/9f066f72-168e-4bdb-b544-a622c6a188e0/oauth2/token`,
        `grant_type=client_credentials&client_id=7d3aad3c-cdc9-4332-ba51-116a76cb0609&client_secret=${sikret}&resource=https://graph.microsoft.com`
      )

      .then(res => localStorage.setItem('access_token', res.data.access_token))
      .catch(error => {
        console.error(error.response);
      });
  }

  findArrayElementByTitle(array, title) {
    return array.find(element => {
      return element.title === title;
    });
  }

  async fetchIntComs(id) {
    let res = await cache.request(`mail-intcoms-${id}`, () => {
      return this.$mail.getIntcoms(id);
    });

    if (res) {
      // console.log('intCOMS RES==>'+ JSON.parse(JSON.stringify(res)))
    }
  }

  /*  let res = await cache.request(
    `mail-attachments-${this.state.message.id,attachId}`,
    () => {
      return this.$mail.getAttachment(this.state.message.id,attachId);
    },
    {
      persist: true
    }
  ); */

  async fetchAttachmentsiaviacrud(id) {
    // console.log('inline attachment detected')
    //let res = await cache.request(`mail-attachments-${id}`, () => {
    // return this.$mail.getAttachments(id);
    //});

    let res = await this.$mail.getAttachments(id);

    //  console.log('res message',res)
    //check throttling
    if (res.data.attachments.name !== 'StatusCodeError') {
      if (res.data.attachments.value.length > 0) {
        let resid = res.data.attachments.value[0].id;
        let fetchid = id;
        let resinlineatt = await cache.request(
          `mail-attachments-${(fetchid, resid)}`,
          () => {
            return this.$mail.getAttachment(fetchid, resid);
          } /* ,
         {
           persist: true
         } */
        );
        //console.log('res ria=>',res.data.attachments)
        //console.log('res ria=>',res.data.attachments,resid,fetchid)
        //let resinlineatt = await this.$mail.getAttachment(fetchid,resid);

        if (resinlineatt) {
          //console.log ('contentBytes',resinlineatt)
          //this.initializeAttachments(res,attachment.name)
          if (typeof resinlineatt !== 'undefined') {
            let forcib;
            forcib = resinlineatt;
            //  console.log ('contentBytes,forcib',forcib)
            this.setState({
              attachmentsia:
                `<img src="data:image/png;base64,` +
                forcib +
                `"` +
                ` width="50%" height="50%"`
            });
          }
        }
      }
    }
  }

  async fetchAttachmentsia(id) {
    // console.log('inline attachment detected')
    let res = await cache.request(`mail-attachments-${id}`, () => {
      return this.$mail.getAttachments(id);
    });
    // console.log('ria=>',id,res.attachments.value[0].id)

    if (res) {
      let resid = res.attachments.value[0].id;
      let fetchid = id;
      let resinlineatt = await cache.request(
        `mail-attachments-${(fetchid, resid)}`,
        () => {
          return this.$mail.getAttachment(fetchid, resid);
        },
        {
          persist: true
        }
      );

      if (resinlineatt) {
        // console.log ('contentBytes',resinlineatt)
        //this.initializeAttachments(res,attachment.name)
        if (typeof resinlineatt !== 'undefined') {
          let forcib;
          forcib = resinlineatt;

          this.setState({
            attachmentsia:
              `<img src="data:image/png;base64,` +
              forcib +
              `"` +
              ` width="50%" height="50%"`
          });
        }
      }
    }
  }

  chatHighlight = (idx, id) => {
    const newChatStatus = [...this.state.chatStatus];
    newChatStatus[idx] = !this.state.chatStatus[idx];
    this.setState({ chatStatus: newChatStatus });
    console.log('chat highlight newChatStatus', newChatStatus[idx], id);
    this.bubbleColor(id, newChatStatus[idx]);
  };

  csschatHighlight = (idx, id) => {
    const newChatStatus = [...this.state.chatStatus];
    newChatStatus[idx] = true;
    this.setState({ chatStatus: newChatStatus });
    //console.log('csschatHighlight', idx,id,this.state.chatStatus)
  };

  async bubbleColor(id, color) {
    console.log('bubblecolorID', id, color);
    this.setState({
      postitcolor: { color }
    });
    const bubblecolor = {
      '@odata.type': '#microsoft.graph.openTypeExtension',
      extensionName: 'Com.Settlementapp99.Bubble',
      bubbleColor: color //this.state.chatStatus //postitcolor
    };
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Access-Control-Allow-Origin': '*'
      }
    };

    axios
      .post(
        `https://graph.microsoft.com/v1.0/users/slsdev@settlementapp99.com/messages/${id}/extensions`,
        bubblecolor,
        axiosConfig
      )

      .then(res => {
        //console.log('Response Received:', res);
      })
      .catch(err => {
        console.log('AXIOS error:', err);
      });
  }

  render() {
    const tracking = this.context;
    const {
      answer,
      style,
      cssbubbletoggle,
      chatbubbleidx,
      commentbubblecolor
    } = this.props;

    const handleToggleComment = idx => {
      this.setState({
        showComment: !this.state.showComment,
        commentIndex: idx
      });
    };

    const handleReply = convId => {
      tracking.track(' click.Replied Button', { audit_logs: convId });
      this.setState({ activeReply: !this.state.activeReply });
      this.setState({ activeReplyAll: false });
    };

    const handleReplyAll = convId => {
      tracking.track(' click.ReplyAll Button', { audit_logs: convId });
      this.setState({ activeReplyAll: !this.state.activeReplyAll });
      this.setState({ activeReply: false });
    };

    let bubbles = this.props.messages.map((m, idx) => {
      let cleaned;

      if (/<hr tabindex="-1".*$/gs.test(m.body.content)) {
        // this.fetchIntComs(m.id) 0414-limit storage error
        this.fetchAttachmentsiaviacrud(m.id);
        cleaned = m.body.content.replace(/<hr tabindex="-1".*$/gs, '');
      } else if (/<div dir="ltr">[\s\S]*?<\/div>/.test(m.body.content)) {
        cleaned = m.body.content.match(/<div dir="ltr">[\s\S]*?<\/div>/);
      } else if (/<div dir="auto">[\s\S]*?<\/div>/.test(m.body.content)) {
        cleaned = m.body.content.match(/<div dir="auto">[\s\S]*?<\/div>/);
      } else {
        cleaned = m.body.content;
      }

      if (/<!--.*$/gs.test(m.body.content)) {
        cleaned = m.body.content.replace(/<!--..*$/gs, '');
      }
      if (/<hr tabindex="-1".*$/gs.test(m.body.content)) {
        // this.fetchIntComs(m.id) 0414-limit storage error
        this.fetchAttachmentsiaviacrud(m.id);
        cleaned = m.body.content.replace(/<hr tabindex="-1".*$/gs, '');
      }
      let inline_att;
      inline_att = cleaned;

      /*  if (m.conversationId=== 'AAQkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNAAQAJfRXRoZbKpOvMDD0jsM8cQ=' &&  m.id==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwABIokkAAAB'){      
        console.log('cleaned and m.body.content' ,cleaned,'MBODY-->',m.body.content,m.id)//,m.body.content,m.id)
      } */
      /*   if (m.conversationId=== 'AAQkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNAAQAHMaBwNSd9xHsX7Auj-M_ms=' && m.id==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwABIokj-QAAAA=='){      
        console.log('cleaned and m.body.content' ,cleaned,'MBODY-->',m.body.content,m.id)//,m.body.content,m.id)
      } */
      //console.log('cleaned and m.body.content' ,cleaned,'MBODY-->',m.conversationId,m.subject)//,m.body.content,m.id)
      //AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEJAAAAATx5ceQnj0GMzazgBhlVdwABJaVZcQAAAA==
      /* if (m.conversationId=== 'AAQkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNAAQAHMaBwNSd9xHsX7Auj-M_ms=' &&  m.id==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEJAAAAATx5ceQnj0GMzazgBhlVdwABJaVZcQAAAA=='){      
        console.log('cleaned and m.body.content' ,cleaned,'MBODY-->',m.body.content,m.id)//,m.body.content,m.id)
      }  */

      if (/<img.+?src=[\"'](.+?)[\"'].+?>/gs.test(cleaned)) {
        inline_att = cleaned
          .toString()
          .replace(/<img.+?src=[\"'](.+?)[\"'].+?>/, this.state.attachmentsia);
      } else if (/<img.+?src=[\"'](.+?)[\"'].+?>/.test(cleaned)) {
        inline_att = cleaned
          .toString()
          .match(/<img.+?src=[\"'](.+?)[\"'].+?>/, this.state.attachmentsia);
      } else {
        inline_att = inline_att;
      }

      let mid = m.id;
      let convo = inline_att; //cleaned;

      let userType =
        m.from.emailAddress.address === 'slsdev@settlementapp99.com'
          ? //? 'right' //0420 - request one line
            'left'
          : 'left';

      let chatHighlight =
        this.state.chatStatus[idx] ||
        m.from.emailAddress.address === 'slsdev@settlementapp99.com'
          ? 'chat-box chat-highlight-grey'
          : 'chat-box ';

      //      console.log('mail id?', m.id);

      return (
        //convo
        <Fragment key={idx}>
          <Row className="mb-2">
            {/* Timer Section */}
            {/* <Col md="2" className="text-right">
              <br />
              <small className="opacity-6">
                <FontAwesomeIcon icon={Icons.faStopwatch} className="mr-1" />
                <Moment date={m.receivedDateTime} durationFromNow="true" />
              </small>
              <br />
       
            </Col> */}

            {/* Comment Section */}
            {/* <EmailMessageBox
              message={cleaned}
              mailobject={m}
              mailId={m.id}
              toggleShowComment={handleToggleComment}
            >
              {m.hasAttachments ? <AttachmentList message={m} /> : null}
            </EmailMessageBox>
            {this.state.showComment && <EmailComment mailId={m.id} />} */}

            <MessageContainer
              newInfoData={this.props.newInfoData}
              isDropdownOpen={this.props.isDropdownOpen}
              toggleDropdown={this.props.toggleDropdown}
              message={cleaned}
              mailObject={m}
              mailId={m.id}
              showComment={this.state.showComment}
              toggleShowComment={handleToggleComment}
              commentIndex={this.state.commentIndex}
              isOpen={this.props.isOpen}
              idx={idx}
              handleReply={handleReply}
              handleReplyAll={handleReplyAll}
              activeReply={this.state.activeReply}
              activeReplyAll={this.state.activeReplyAll}
            />

            {/* <Col md="9" className={`text-${userType} p-2`}>
              <div
                className={`chat-box-wrapper chat-box-wrapper-${userType} my-2 p-0`}
                key={`msg-${idx}`}
              >
                <div className={chatHighlight} id={`chat-box-${idx}`}>
                  <MessageComment>
                    {answer} = {m.id}
                    {style} ={() => this.chatHighlight(idx, m.id)}
                    {chatbubbleidx}= {idx}
                    {cssbubbletoggle} ={() => this.csschatHighlight(idx, m.id)}
                    {commentbubblecolor} = {this.state.chatStatus[idx]}
                  </MessageComment>
                </div>
              </div>

              {m.from.emailAddress.address}
            </Col> */}
          </Row>
          {/* <Row>
                <Col md={{ size: 12, offset: '2' }}>
                  {m.hasAttachments ? <AttachmentList message={m} /> : null}
                </Col>
              </Row> */}
        </Fragment>
      );
    });
    return <div>{bubbles}</div>;
  }
}

Message.contextType = TrackingContext;
