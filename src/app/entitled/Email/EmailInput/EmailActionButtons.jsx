import React, { useCallback, useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import {
  EmailActionButtonsContainer,
  EmailActionButton,
  EmailSendButton,
  EmailInvertSendButton
} from '../StyledComponents';
import BellRingIcon from './BellRingIcon';
import mail from '../../services/Mail';
import Swal from 'sweetalert2';
import { ObjectId } from 'bson';
const bsonid  = new ObjectId();
const axios = require('axios');
const $mail = mail

const EmailActionButtons = state => {
/* 
   useEffect(() => {
    console.log('EmailActionButtons',state)
     
   }, []); */
 
  const orireply = async () => {  
    
    console.log('replyvia $mail')
    let attachmentsfromstate=[]
    attachmentsfromstate = state.data.attachments //[0]
  //  console.log('attachmentsfromstate ',attachmentsfromstate)
    let arraylenght= attachmentsfromstate.length
      //console.log('arraylenght',attachmentsfromstate, arraylenght)
      let files =0
      let attachmentsfromstatepost
      while (files < arraylenght){        
          attachmentsfromstatepost= attachmentsfromstate[files]         
          files++
          console.log('message state',attachmentsfromstatepost) 

      }       
//let checkattach = state.data.attachments[0]
/* console.log('state',state.data.mailid)
if (checkattach !== ''){
  const resatta= await $mail.addAttachment(state.data.mailid,state.data.attachments)
}  */


let msgbody = {
  
    attachmentsfromstatepost
  
};


if (state.data.replyall === true){
  
  let commentbody={ 
    body: {
      contentType: "html",
      content: state.data.textarea
          },
  }
  console.log('body replyall',commentbody)
    //const res = await $mail.createReply(state.data);
    const res = await $mail.createReply(state.data.mailid,commentbody);
    console.log('res draft',res)
  }else{
  /*   let commentbody=      
         state.data.textarea          
    
    console.log('body reply',commentbody)
    const res =  await $mail.createReply(state.data.mailid,commentbody);
    console.log('res draft',res) */
    let checkattach = state.data.attachments[0]
    if (checkattach !== ''){
      const resatta= await $mail.addAttachment(state.data.mailid,attachmentsfromstatepost)
      console.log('res of attachment',resatta)
    }  
   /*  const res = await $mail.reply({   
      id: state.data.mailid,     
      body: state.data.textarea, 
      content: 'Text',
      hasAttachments: true,      
      attachments:state.data.attachments 

    });   */

  //  let attachtoMailid= res.data.id
  //  console.log('reply new MailID->>',res)
    
 //console.log('state',state.data.mailid)

 

}
     
Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Email Successfully Sent',
  showConfirmButton: false,
  timer: 1500
});  
      }

      const reply = async () => {     

      console.log('message state',state) 
        let attachmentsfromstate=[]
        attachmentsfromstate = state.data.attachments     
        let arraylenght= attachmentsfromstate.length
         
          let files =0
          let attachmentsfromstatepost
          while (files < arraylenght){        
              attachmentsfromstatepost= attachmentsfromstate[files]         
              files++
          }       


          let checkattach = state.data.attachments[0]
         // console.log('state',state.data.mailid)
          
         if (checkattach !== ''){
            //const resatta= await $mail.addAttachment(state.data.mailid,state.data.attachments)
            const mstoken= await $mail.getToken()
        let tokeinStorage = localStorage.setItem('access_token', mstoken.data.auth.access_token)      
        let axiosConfig = {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Access-Control-Allow-Origin': '*'
          }
        };   
          let replybody = {            
            toRecipients: state.data.props.from.emailAddress,  
            subject: state.data.subject,              
            "body": {
              contentType: "Text",
              content:state.data.textarea
            },
            comment:state.data.textarea
                          };    
     
       let bsondraftFolderId= bsonid.toString()
       const bsonmailFolder = {
        displayName: bsondraftFolderId
      };
    const createReply = await axios({
      url: `https://graph.microsoft.com/v1.0/users/slsdev@settlementapp99.com/messages/${state.data.props.id}/createReply`,
      method: 'post',
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Access-Control-Allow-Origin': '*'
      }, 
      data: 
        replybody      
        })
      .then(res => res.data)
      .catch (err => console.error(err))
      
      let createReplyMailId= await createReply  
        const addAttachments = await axios
        .post(`https://graph.microsoft.com/v1.0/users/slsdev@settlementapp99.com/messages/${createReplyMailId.id}/attachments`,
        attachmentsfromstatepost,
          axiosConfig)
        .then(res => {console.log('Response Received:', res);})
        .catch(err => {console.log('AXIOS error:', err);}); 
        const senddraft= await $mail.senddraft(createReplyMailId.id)       
          }
        
        else{
          const res = await $mail.reply({   
            id: state.data.mailid,     
            body: state.data.textarea, 
            content: 'Text',
             })
        }
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Email Successfully Sent',
          showConfirmButton: false,
          timer: 1500
        }); 
      };
  return (
    <EmailActionButtonsContainer>
      <Col xs={12} md={8}>
        <EmailActionButton>Yes</EmailActionButton>
        <EmailActionButton>No</EmailActionButton>
        <EmailActionButton>Please follow up.</EmailActionButton>
        <EmailActionButton>Show More...</EmailActionButton>
      </Col>
      <Col xs={12} md={4} align="right">
        <EmailInvertSendButton>
          <BellRingIcon className="email-bell-ring-icon" />
          Send
        </EmailInvertSendButton>
        <EmailSendButton onClick={reply}>Send</EmailSendButton>
      </Col>
    </EmailActionButtonsContainer>
  );
};

export default EmailActionButtons;
