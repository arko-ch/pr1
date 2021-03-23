import React, { Fragment, PureComponent } from 'react';
import {
  Container,
  Row,
  Button,
  Col,
  Collapse,
  UncontrolledTooltip,
  ButtonGroup
} from 'reactstrap';
//import Loader from 'react-loaders';
//import { Store as GlobalStore } from '../../stores/global';
import Moment from 'react-moment';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';
import Message from './Message';
import Conversation from './Conversation';
import { crud } from '../services/crud';
import cache from '../services/cache';
import openSocket from 'socket.io-client';
import config from '../app/config/config';
//import FileManager from './FileManager';
import {
  MessageItemContainer,
  CommentSenderContainer,
  AttachedFiles as Attached
} from './EmailStyledComponents';
import EmailAvatar from './EmailAvatar';
import EmailSender from './EmailSender';
import Emailmessage from './EmailMessage';
import AttachedFiles from './AttachedFiles';
//import EmailInput from './EmailInput';
//import EmailMessageBox from './EmailMessageBox';
import { avatars, avatar } from './helpers';

//import {
//  EmailButton,
//  EmailTime,
//  EmailSubject,
 // EmailContentHeader
//} from './StyledComponents';

import { TrackingContext } from 'treacker';
//import { useTracking } from "treacker"
import { withTracking } from 'treacker';
import mail from '../services/Mail';
const $mail = mail
const socket = openSocket(config.returnEnv());
const ObjectID = require('mongodb').ObjectID;
const axios = require('axios');
export default class MessageItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      messages: null,
      next: null,
      active: false,
      property: null,
      assignedProperty: {},
      avatars: '',
      time: {},
      seconds: 5,
      readpeek: '',
      pulse: false,
      attachments: false,
      isOpenAssign:false,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.naread = this.naread.bind(this);
    this.$property = crud('properties');
    this.setProperty = this.setProperty.bind(this);
    this.fetchConvo = this.fetchConvo.bind(this);
    this.fetchAvatar = this.fetchAvatar.bind(this);
    this.viewed = this.viewed.bind(this);
    this.updateviewer = this.updateviewer.bind(this);
    this.addviewer = this.addviewer.bind(this);
    this.addPulse = this.addPulse.bind(this);
    this.removePulse = this.removePulse.bind(this);
    this.pulseToggle = this.pulseToggle.bind(this);
    this.$mail = mail;
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentDidMount() {
    //console.log('PROPS for v2',this.props)
    //console.log('this.state for v2',this.state)
    //const tracking = this.context;

    // tracking.track('user-component.loaded')

    this.fetchConvo();
    this.$root.$on(`property-fetched-${this.state.convoId}`, this.setProperty);
    this.$root.$on(`mail-convo-refresh-${this.state.convoId}`, this.fetchConvo);
    //mail-send -pre work for pulse off 041720
    //this.$root.$on(`mail-send`, this.pulseToggle);
   /*  socket.on('food_ready', res =>
      this.setState({ commentsockets: res.mailid })
    ); */
    //socket.on("pulse_off", res => this.setState({commentsocketss: res.mailid}));
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    //rawi0713 Expected === saw ==
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    //rawi0713 Expected === saw ==
    if (seconds === 0) {
      clearInterval(this.timer);
      this.setState({
        readpeek: 'read'
      });
    }
    //console.log(this.state.time.m, 's'+ this.state.time.s)
  }

  naread(id) {
    //console.log('this.state.readpeek',this.state.readpeek)
    // rawi0713 Expected !== saw !=
    if (this.state.readpeek !== 'read') {
      //console.log ('peek only');
      this.setState({
        readpeek: 'peeked'
      });
    }
    //this.fetchAvatar(id)
  }
  componentWillUnmount() {
    this.$root.$off(
      `mail-convo-refresh-${this.state.convoId}`,
      this.fetchConvo
    );
    this.$root.$off(`property-fetched-${this.state.convoId}`, this.setProperty);
    this.addPulse = this.addPulse(undefined);
  }

  pulseToggle = () => {
    console.log('pulsetoggle', this.state.pulse);
    this.setState({
      pulse: false
    });
  };
  addPulse = mailid => {
    //axios.post('http://dev.settlementapp99.com/internalcomments', {
    axios
      .post(config.returnEnv() + 'internalcomments/', {
        mailid
      })
      .then(res => {
        if (res.status !== 200) return;
        /* this.setState(prevState => ({
        pulse: !prevState.pulse
      })); */
        this.setState({
          pulse: true
        });
        res.json().then(data => console.log(data));
      })
      .catch(err => console.log('Fetch Error :-S', err));
  };

  removePulse = mailid => {
    //axios.post('http://dev.settlementapp99.com/internalcomments', {
    axios
      .post(config.returnEnv() + 'sendpulseoff/', {
        mailid
      })
      .then(res => {
        if (res.status !== 200) return;
        /* this.setState(prevState => ({
        pulse: !prevState.pulse
      })); */
        this.setState({
          pulse: false
        });
        res.json().then(data => console.log(data));
      })
      .catch(err => console.log('Fetch Error :-S', err));
  };

  setProperty(property) {
    //console.log('setProperty',property)
    this.setState({ property: property });
    this.fetchProperty();
  }

  /*  setProperty(property) {
    this.setState({ property: property });
    this.fetchProperty();
  } */

  async fetchProperty() {
    const id = this.state.property && this.state.property.context.propertyId;
    let res;
    if (id) {
      res = await this.$property.find({
        _id: ObjectID(id),
        _project: [
          'referenceNo',
          'manager',
          'processor',
          'examiner',
          'closer',
          'postCloser',
          'backOffice'
        ]
      });
    }

    if (res && res.data) {
      this.setState({ assignedProperty: res.data[0] });
    }
  }

  async fetchConvo() {
    const $mail = mail;
    let res = await $mail.getConvo(this.state.convoId);

    //    console.log('message item res >', res);

    if (res.data.messages) {
      this.setState({
        messages: res.data.messages.value,
        next: res.data.messages['@odata.nextLink']
      });
    }
  }

  findSender() {
    let senderIdx;
    this.state.messages.every((el, idx) => {
      if (el.from.emailAddress.address !== 'slsdev@settlementapp99.com') {
        senderIdx = idx;
        return false;
      }
      return true;
    });
    return senderIdx;
  }

  async loadMore() {
    if (this.state.next) {
      let res = await this.$mail.getNext(this.state.next);
      res = res.data;
      if (res.items) {
        this.setState({
          messages: [...this.state.messages, ...res.items.value],
          next: res.items['@odata.nextLink']
        });
      }
    }
  }

  async fetchAvatar(id) {
    let res = await cache.request(`mail-avatars-${id}`, () => {
      return this.$mail.getAvatars(id);
    });

    //if (typeof res.viewers.statusCode !== '404') {
    if (res) {
      await this.setState({
        avatars: res.viewers.viewers
      });
      let storedavatar = JSON.stringify(
        JSON.parse(sessionStorage.getItem('settlement-app-client')).user.data
          .user.profilepic
      );
      var s = JSON.stringify(this.state.avatars);
      var r = new RegExp(`${JSON.parse(storedavatar)}`);
     
      if (r.test(s)) {
//        console.log('meron', id);

        
        let [arr] = [res.viewers.viewers.split(',')];
        let preserve = arr.filter(function(newarr) {         
          return newarr.substr(0, 13) != JSON.parse(storedavatar);
        });
       // console.log('preserve', preserve);
        let passpreserve = {};
        passpreserve = preserve[0];
        console.log(
          'passpreserve',
          passpreserve + 'array count==>',
          arr.length
        );
        if (arr.length > 1) this.updateviewer(id, passpreserve);
        if (arr.length == 1) this.viewed(id);
      } else {
        if (res.viewers.statusCode === 404) {
          this.viewed(id);
        } else {
          this.addviewer(id, storedavatar);
        }
      }
    }
  }

  async viewed(msgid) {
    const $mail = mail;
    console.log(
      'creating viewers==>>',
      msgid,
      JSON.parse(sessionStorage.getItem('settlement-app-client')).user.data.user
        .profilepic
    );
    let tempDate = new Date();
    let viewednow =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate() +
      ' ' +
      tempDate.getHours() +
      ':' +
      tempDate.getMinutes() +
      ':' +
      tempDate.getSeconds();
    let profpic =
      JSON.parse(sessionStorage.getItem('settlement-app-client')).user.data.user
        .profilepic +
      '/' +
      JSON.parse(sessionStorage.getItem('settlement-app-client')).user.data.user
        .name +
      '/' +
      viewednow +
      '/' +
      this.state.readpeek +
      '/' +
      'Overlay';

    let res; 
    res = await $mail.viewers({
      id: msgid,
      '@odata.type': '#microsoft.graph.openTypeExtension',
      extensionName: 'Com.Settlementapp99.Viewers',
      comsInternal: profpic
    });

   
  }
 
  async addviewer(msgid, s) {
    const $mail = mail;
    console.log(
      'adding viewers====>',
      msgid,
      JSON.parse(sessionStorage.getItem('settlement-app-client')).user.data.user
        .profilepic
    );
    let tempDate = new Date();
    let viewednow =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate() +
      ' ' +
      tempDate.getHours() +
      ':' +
      tempDate.getMinutes() +
      ':' +
      tempDate.getSeconds();
    let profpic =
      JSON.parse(sessionStorage.getItem('settlement-app-client')).user.data.user
        .profilepic +
      '/' +
      JSON.parse(sessionStorage.getItem('settlement-app-client')).user.data.user
        .name +
      '/' +
      viewednow +
      '/' +
      this.state.readpeek +
      '/' +
      'Overlay' +
      ',' +
      JSON.parse(JSON.stringify(this.state.avatars));

    let res; //console.log('MailboxJS', JSON.stringify(message))
    res = await $mail.viewers({
      id: msgid,
      '@odata.type': '#microsoft.graph.openTypeExtension',
      extensionName: 'Com.Settlementapp99.Viewers',
      comsInternal: profpic
    });
  }

  async updateviewer(msgid, preserve) {
    const $mail = mail;
//    console.log('updating viewers====>', msgid, preserve);
    let tempDate = new Date();
    let viewednow =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate() +
      ' ' +
      tempDate.getHours() +
      ':' +
      tempDate.getMinutes() +
      ':' +
      tempDate.getSeconds();
    let profpic =
      JSON.parse(sessionStorage.getItem('settlement-app-client')).user.data.user
        .profilepic +
      '/' +
      JSON.parse(sessionStorage.getItem('settlement-app-client')).user.data.user
        .name +
      '/' +
      viewednow +
      '/' +
      this.state.readpeek +
      '/' +
      'Overlay' +
      ',' +
      preserve; 

    let res; 
    res = await $mail.viewers({
      id: msgid,
      '@odata.type': '#microsoft.graph.openTypeExtension',
      extensionName: 'Com.Settlementapp99.Viewers',
      comsInternal: profpic
    });  
  }

  toggleAssign(){
    this.setState(prevState => ({
      isOpenAssign: !prevState.isOpenAssign
    }));
  
   }

  render() {
    const tracking = this.context;
    const { idavatar } = this.props;
    const commentsocket = this.state;
    let idx = this.state.idx;
    let message;
//    console.log('messageitem props',this.props)
    if (this.state.messages) {
      let senderMsg = this.findSender() || 0;
      let m = this.state.messages[senderMsg];
      let sender = m.from || {
        emailAddress: {}
      };

      let assigned = false;
      if (this.state.property) {
        assigned = true;
      }

      const handleReply = (e, id, mailid) => {
        console.log('user.data.user.', id);

        const newTotal = e;

        tracking.track(id + ' click.Replied Button', { audit_logs: mailid });
      };

      const handleForward = (e, id, mailid) => {
        console.log('user.data.user.', id);

        const newTotal = e;

        tracking.track(id + ' click.Forward Button', { audit_logs: mailid });
      };

     
      const isImportant = idx === 0 ? true : false;
      const newMessage = idx === 1 || idx === 2 ? true : false;
    //  console.log('MESSAGE ITEM this props',this.props)

 
      const handleCleanMessage = m => {
        let cleaned;
      
       // console.log('m cleaned',m)

        if (/<hr tabindex="-1".*$/gs.test(m.body.content)) {
          // this.fetchIntComs(m.id) 0414-limit storage error
          this.fetchAttachmentsiaviacrud(m.id);
          cleaned = m.body.content.replace(/<hr tabindex="-1".*$/gs, '');
          if (m.id ==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwAB6HZh2wAAAA=='){
           // console.log('cleaned new eamil otop 501',cleaned)
          }
        } else if (/<div dir="ltr">[\s\S]*?<\/div>/.test(m.body.content)) {         
          cleaned = m.body.content.match(/<div dir="ltr">[\s\S]*?<\/div>/);
          if (m.id ==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwAB6HZh2wAAAA=='){
           // console.log('cleaned new eamil otop 506',m,cleaned)
          }
        } else if (/<div dir="auto">[\s\S]*?<\/div>/.test(m.body.content)) {       
          cleaned = m.body.content.match(/<div dir="auto">[\s\S]*?<\/div>/);
          if (m.id ==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwAB6HZh2wAAAA=='){
          //  console.log('cleaned new eamil otop 511',cleaned)
          }
        } else {          
          cleaned = m.body.content;
          if (m.id ==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwAB6HZh2wAAAA=='){
          //  console.log('cleaned new eamil otop 516',cleaned)
          }
        }

        if (/<!--.*$/gs.test(m.body.content)) {
          cleaned = m.body.content.replace(/<!--..*$/gs, '');
          if (m.id ==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwAB6HZh2wAAAA=='){
          //  console.log('cleaned new eamil otop 523',cleaned)
          }
        }
        if (/<hr tabindex="-1".*$/gs.test(m.body.content)) {
          // this.fetchIntComs(m.id) 0414-limit storage error
          this.fetchAttachmentsiaviacrud(m.id);
          cleaned = m.body.content.replace(/<hr tabindex="-1".*$/gs, '');
          if (m.id ==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwAB6HZh2wAAAA=='){
         //   console.log('cleaned new eamil otop 531',cleaned)
          }
        }
        let inline_att;
        inline_att = cleaned;

        if (/<img.+?src=[\"'](.+?)[\"'].+?>/gs.test(cleaned)) {
          inline_att = cleaned
            .toString()
            .replace(
              /<img.+?src=[\"'](.+?)[\"'].+?>/,
              this.state.attachmentsia
            );
            if (m.id ==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwAB6HZh2wAAAA=='){
           //   console.log('cleaned new eamil otop 545',cleaned)
            }
        } else if (/<img.+?src=[\"'](.+?)[\"'].+?>/.test(cleaned)) {
          inline_att = cleaned
            .toString()
            .match(/<img.+?src=[\"'](.+?)[\"'].+?>/, this.state.attachmentsia);
            if (m.id ==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwAB6HZh2wAAAA=='){
           //   console.log('cleaned new eamil otop 552',cleaned)
            }
        } else {
          inline_att = inline_att;
          if (m.id ==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwAB6HZh2wAAAA=='){
          //  console.log('cleaned new eamil otop 557',m,cleaned)
          }
        }
       
        return cleaned;
      };

//            console.log('mailobject >', m.subject);

      const handleOpenAttachments = (e, id) => {
        e.stopPropagation();
        if (!this.props.openedMessages.includes(m.id)) {
          this.props.handleOpenMessage(id);
        }
        this.setState({ attachments: true });
      };

      const handleCloseAttachments = e => {
        e.stopPropagation();
        this.setState({ attachments: false });
      };

      message = (
        <>
         

          <MessageItemContainer
            onClick={() => {
              this.fetchAvatar(m.id);

              if (!this.props.openedMessages.includes(m.id)) {
                this.props.handleOpenMessage(m.id);
              } else {
                this.props.handleCloseMessage(m.id);
              }
            }}
            // isImportant={isImportant}
            isOpen={this.props.openedMessages.includes(m.id)}
            newMessage={newMessage}
          >
            <Col xs={1}>
              <EmailAvatar src={avatar} />
            </Col>
            <Col xs={8}>
              <EmailSender
                sender={sender.emailAddress.name}
                isImportant={isImportant}
                newMessage={newMessage}
                messageitem={m}
              />
             {/*  <Emailmessage idx={idx} message={handleCleanMessage(m)} />  */}
             <Emailmessage idx={idx} message={m.subject } conversationId={m.conversationId} /> 
              
              <CommentSenderContainer className="mt-2">
             
                  <AttachedFiles
                    conversationId={this.props.convoId}
                    handleOpenAttachments={handleOpenAttachments}
                    handleCloseAttachments={handleCloseAttachments}
                    id={m.id}
                    attachments={this.state.attachments}
                  />
              
                <Attached className="ml-2">
                  <FontAwesomeIcon icon={Icons.faListAlt} className="mr-1" />
                  Link to the form
                </Attached>
              </CommentSenderContainer>
            </Col>

            <Col className="vertical-center-div justify-content-end" xs={3}>
              <Viewers>
                {idavatar} = {m.id}
              </Viewers>
            </Col>
           
          </MessageItemContainer>
          <Collapse
            onEntered={this.startTimer}
            onExited={this.naread(m.id)}
            isOpen={this.props.openedMessages.includes(m.id)}
            aria-labelledby="headingOne"
            id={m.id}
            className="email-content-container"
          >
            {this.state.attachments && (
              <Row>
                <Conversation
                  message={m}
                  postFetch={this.setProperty}
                  folder={this.state.folder}
                  idx={idx}
                />
              </Row>
            )}

            <Row className="mb-2">
              <Col>
                {
                  <Message
                    newInfoData={this.props.newInfoData}
                    isDropdownOpen={this.props.isDropdownOpen}
                    toggleDropdown={this.props.toggleDropdown}
                    message={m}
                    messages={this.state.messages}
                    isOpen={this.props.openedMessages.includes(m.id)}
                  />
                }
                {this.state.next && (
                  <Button
                    className="mail-load-older-msg"
                    color="link"
                    onClick={() => {
                      this.loadMore();
                    }}
                  >
                    <FontAwesomeIcon icon={Icons.faSync} className="mr-2" />{' '}
                    Load older messages
                  </Button>
                )}
              </Col>
            </Row>
          </Collapse>
        </>
      );
    }

    return <>{message}</>;
  }
}
function findMatches(regex, str, matches = []) {
  const res = regex.exec(str);
  res && matches.push(res) && findMatches(regex, str, matches);
  return matches;
}

class Viewers extends React.Component {
  // Set initial state of isHidden to false

  constructor(props) {
    super(props);
    this.state = {
      vavatars: '',
      imgarrays: []
    };

    this.fetchAvatars = this.fetchAvatars.bind(this);
    //this.RenderImg=this.RenderImg.bind(this);
  }

  async componentDidMount() {
    //console.log('didmount fetching avatar==>',this.props.children[2])
    await this.fetchAvatars(this.props.children[2]);
  }

  async fetchAvatars(id) {
    //    console.log('fetching avatars via didmount')
    let res = await cache.request(`mail-avatars-${id}`, () => {
      return $mail.getAvatars(id);
    });

    if (typeof res.viewers.viewers !== 'undefined') {
      //console.log(res)
      let timgurl;
      timgurl = res.viewers.viewers;
      let imgurl;
      imgurl = timgurl.substr(0, timgurl.length - 1);
      // console.log('imgurl', imgurl);

      await this.setState(
        {
          vavatars: `https://slsprofilepic.s3.amazonaws.com/${imgurl}`,
          meronview: true,
          imgarrays: imgurl.split(',')
        },
        function() {
          //console.log('this is not undefined' + id +'--' + this.state.vavatars);
        }.bind(this)
      );
    }

    if (typeof res.viewers.viewers === 'undefined') {
      //console.log('no avatar yet',res.viewers)
      await this.setState(
        {
          meronview: false,
          vavatars: '',
          meronview: true
        },
        function() {
          //console.log('this is undefined' + this.state.vavatars);
        }.bind(this)
      );
    }
  }

  render() {
    const { idavatar } = this.props.children[2];
    const imagesarray = this.state.imgarrays;
    //const {commentsocket} = this.state;
    //let avatarname = asset.name.slice(((asset.name.lastIndexOf('.') - 1) >>> 0) + 2);
    return (
      <Fragment>
        <div className="widget-content p-0">
          <div className="widget-content-center">
            <div className="avatar-wrapper avatar-wrapper-overlap">
              <Container fluid>
                <Col>
                  {this.state.imgarrays.map((image, idx) => (
                    <div
                      key={idx}
                      className="avatar-icon-wrapper avatar-icon-sm"
                    >
                      <img
                        id={
                          `avatar-${this.props.children[2].substr(0, 150)}` +
                          `${image.substr(0, 9)}`
                        }
                        width={55}
                        className="email-viewed-img"
                        src={`https://slsprofilepic.s3.amazonaws.com/${image.substr(
                          0,
                          13
                        )}`}
                        alt=""
                      />
                      <UncontrolledTooltip
                        placement="left"
                        target={
                          `avatar-${this.props.children[2].substr(0, 150)}` +
                          `${image.substr(0, 9)}`
                        }
                      >
                        {/* <a> {image.substr(32,9)} peek @ <Moment date={image.substr(14,25)} durationFromNow /> </a> */}
                        {/* <a> {image.split('/')[1]} {image.split('/')[3]} <Moment date={image.split('/')[2]} durationFromNow={true} /> </a>    */}
                        <a>
                          {' '}
                          {image.split('/')[1]} {image.split('/')[3]}{' '}
                          <Moment from={image.split('/')[2]} /> ago{' '}
                        </a>
                      </UncontrolledTooltip>
                    </div>
                  ))}
                </Col>
              </Container>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
MessageItem.contextType = TrackingContext;
