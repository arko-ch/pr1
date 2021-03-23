import React, { useEffect, useState,Fragment } from 'react';
import {
  Container,
  Row,
  Button,
  Col,
  Collapse,
  UncontrolledTooltip,
  ButtonGroup
} from 'reactstrap';
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

import events from '../services/events';
import { TrackingContext } from 'treacker';
//import { useTracking } from "treacker"
import { withTracking } from 'treacker';
import mail from '../services/Mail';
const $mail = mail
const socket = openSocket(config.returnEnv());
const ObjectID = require('mongodb').ObjectID;
const axios = require('axios');


const MessageItemV2 =(props) => {
  const [state, setState] = useState([]);
  const [messages, setMessages] = useState(null);
  const [next, setNext] = useState(null);
  const [active, setActive] = useState(false);
  const [property, setProperty] = useState(null);
  const [assignedProperty, setAssignedProperty] = useState({});
  const [avatar, setAvatars] = useState('');
  const [time, setTime] = useState({});
  const [seconds, setSeconds] = useState(5);
  const [readpeek, setReadpeak] = useState('');
  const [pulse, setPulse] = useState(false);
  const [attachments, setAttachments] = useState(false);
  const [isOpenAssign, setIsOpenAssign] = useState(false);
  //
  const [attachmentsia, setIsAttachmentsia] = useState('');
  const $property = crud('properties')
  const timer = 0
  const secondsToTime= (secs) => {
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

  useEffect (() =>{
    console.log('props V2',props)
    fetchConvo()
    let timeLeftVar = secondsToTime(seconds);
    setTime(timeLeftVar);
  },[]
  )
  const countDown = () =>{
    // Remove one second, set state so a re-render happens.
    let seconds = seconds - 1;
    setSeconds(secondsToTime(seconds))
    

   
    if (seconds === 0) {
      clearInterval(timer);
      setReadpeak('read')
      
    }
    
  }
 const startTimer=() =>{
    const timer = 0;
    if (timer === 0 && seconds > 0) {
      timer = setInterval(this.countDown, 1000);
    }
  }

  const naread =(id) => {
   
    if (readpeek !== 'read') {     
      setReadpeak('peeked')    
    }    
  }
  const pulseToggle = () => {
  
    setPulse(false)
   
  };

 const addPulse = mailid => {
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
      setPulse(true)  
      
        res.json().then(data => console.log(data));
      })
      .catch(err => console.log('Fetch Error :-S', err));
  };
  const removePulse = mailid => {
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
      setPulse(false) 
        res.json().then(data => console.log(data));
      })
      .catch(err => console.log('Fetch Error :-S', err));
  };

 const AssignProperty =(property) => {
    //console.log('setProperty',property)
    setProperty(property)
    fetchProperty();
  }

  const fetchProperty = async () => {
    const id = state.property && state.property.context.propertyId;
    let res;
    if (id) {
      res = await $property.find({
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
      setAssignedProperty(res.data[0])     
    }
  }

  const fetchConvo = async () =>{
    const $mail = mail;
    let res = await $mail.getConvo(state.convoId);   

    if (res.data.messages) {
      setMessages(res.data.messages.value)
      setNext(res.data.messages['@odata.nextLink'])
     }
  }

 const findSender= () => {
    let senderIdx;
    messages.every((el, idx) => {
      if (el.from.emailAddress.address !== 'slsdev@settlementapp99.com') {
        senderIdx = idx;
        return false;
      }
      return true;
    });
    return senderIdx;
  }

  const loadMore =async () =>{
    if (next) {
      let res = await $mail.getNext(next);
      res = res.data;
      if (res.items) {
        setMessages([...messages, ...res.items.value])
        setNext(res.data.messages['@odata.nextLink'])       
      }
    }
  }

  const fetchAvatar= async (id) =>{
    let res = await cache.request(`mail-avatars-${id}`, () => {
      return $mail.getAvatars(id);
    });

    //if (typeof res.viewers.statusCode !== '404') {
    if (res) {
      await setAvatars(res.viewers.viewers)
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
        if (arr.length > 1) updateviewer(id, passpreserve);
        if (arr.length == 1) viewed(id);
      } else {
        if (res.viewers.statusCode === 404) {
          viewed(id);
        } else {
          addviewer(id, storedavatar);
        }
      }
    }
  }

  const viewed = async (msgid) => {
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
     readpeek +
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

  const addviewer= async(msgid, s) =>{
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
      readpeek +
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

  const updateviewer= async (msgid, preserve) => {
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
      readpeek +
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

  const toggleAssign= ()=>{
    setIsOpenAssign(!isOpenAssign)  
   }

   //const tracking = this.context;
    const { idavatar } = props;
    const commentsocket = state;
    let idx = state.idx;
    let message;

    if (state.messages) {
      let senderMsg = findSender() || 0;
      let m = state.messages[senderMsg];
      let sender = m.from || {
        emailAddress: {}
      };
    }

    let assigned = false;
    if (state.property) {
      assigned = true;
    }

    const isImportant = idx === 0 ? true : false;
    const newMessage = idx === 1 || idx === 2 ? true : false;

    const fetchAttachmentsiaviacrud = async(id) => {
      let res = await $mail.getAttachments(id);
  
      if (res.data.attachments.name !== 'StatusCodeError') {
        if (res.data.attachments.value.length > 0) {
          let resid = res.data.attachments.value[0].id;
          let fetchid = id;
          let resinlineatt = await cache.request(
            `mail-attachments-${(fetchid, resid)}`,
            () => {
              return $mail.getAttachment(fetchid, resid);
            } 
          );
         
  
          if (resinlineatt) {
           
            if (typeof resinlineatt !== 'undefined') {
              let forcib;
              forcib = resinlineatt;
              //  console.log ('contentBytes,forcib',forcib)
              setIsAttachmentsia( `<img src="data:image/png;base64,` +
              forcib +
              `"` +
              ` width="50%" height="50%"`)              
            }
          }
        }
      }
    }

    const handleCleanMessage = m => {
      let cleaned;
    
     // console.log('m cleaned',m)

      if (/<hr tabindex="-1".*$/gs.test(m.body.content)) {
        // this.fetchIntComs(props.id) 0414-limit storage error
        fetchAttachmentsiaviacrud(m.id);
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
        fetchAttachmentsiaviacrud(m.id);
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
            state.attachmentsia
          );
          if (m.id ==='AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwAB6HZh2wAAAA=='){
         //   console.log('cleaned new eamil otop 545',cleaned)
          }
      } else if (/<img.+?src=[\"'](.+?)[\"'].+?>/.test(cleaned)) {
        inline_att = cleaned
          .toString()
          .match(/<img.+?src=[\"'](.+?)[\"'].+?>/, state.attachmentsia);
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

  /*   const handleOpenAttachments = (e, id) => {
      e.stopPropagation();
      if (!props.openedMessages.includes(id)) {
        props.handleOpenMessage(id);
      }
      setAttachments(true)
      
    };

    const handleCloseAttachments = e => {
      e.stopPropagation();
      setAttachments(false)
    }; */
    let messageJ;
    let sender;
    
    messageJ = (
      <>
       

        <MessageItemContainer
          onClick={() => {
            fetchAvatar(props.id);

            if (!props.openedMessages.includes(props.id)) {
              props.handleOpenMessage(props.id);
            } else {
              props.handleCloseMessage(props.id);
            }
          }}
          // isImportant={isImportant}
          isOpen={props.openedMessages.includes(props.id)}
          newMessage={newMessage}
        >
          <Col xs={1}>
            <EmailAvatar src={avatar} />
          </Col>
          <Col xs={8}>
            <EmailSender
//              sender={sender.emailAddress.name}
              isImportant={isImportant}
              newMessage={newMessage}
              messageitem={props}
            />
           {/*  <Emailmessage idx={idx} message={handleCleanMessage(m)} />  */}
           <Emailmessage idx={idx} message={props.subject } conversationId={props.conversationId} /> 
            
            <CommentSenderContainer className="mt-2">
           
                <AttachedFiles
                  conversationId={props.convoId}
                 // handleOpenAttachments={handleOpenAttachments}
               //   handleCloseAttachments={handleCloseAttachments}
                  id={props.id}
                  attachments={state.attachments}
                />
            
              <Attached className="ml-2">
                <FontAwesomeIcon icon={Icons.faListAlt} className="mr-1" />
                Link to the form
              </Attached>
            </CommentSenderContainer>
          </Col>

          <Col className="vertical-center-div justify-content-end" xs={3}>
            <Viewers>
              {idavatar} = {props.id}
            </Viewers>
          </Col>
         
        </MessageItemContainer>
        <Collapse
          onEntered={startTimer}
          onExited={naread(props.id)}
          isOpen={props.openedMessages.includes(props.id)}
          aria-labelledby="headingOne"
          id={props.id}
          className="email-content-container"
        >
          {state.attachments && (
            <Row>
              <Conversation
                message={props}
                postFetch={AssignProperty}
                folder={state.folder}
                idx={idx}
              />
            </Row>
          )}

          <Row className="mb-2">
            <Col>
              {
                <Message
                  newInfoData={props.newInfoData}
                  isDropdownOpen={props.isDropdownOpen}
                  toggleDropdown={props.toggleDropdown}
                  message={props}
                  messages={messages}
                  isOpen={props.openedMessages.includes(props.id)}
                />
              }
            {/*   {next && (
                <Button
                  className="mail-load-older-msg"
                  color="link"
                  onClick={() => {
                   loadMore;
                  }}
                >
                  <FontAwesomeIcon icon={Icons.faSync} className="mr-2" />{' '}
                  Load older messages
                </Button>
              )} */}
            </Col>
          </Row>
        </Collapse>
      </>
    );
  
  return (
    
    <div>
      {messageJ}
    </div>
  )
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
export default MessageItemV2;