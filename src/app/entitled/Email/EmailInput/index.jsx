import React, { useCallback, useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';
import {
  EmailInputContainer,
  EmailCloseButtonContainer,
  EmailTextArea
} from '../StyledComponents';
import EmailActionButtons from './EmailActionButtons';
import EmailUploadButtons from './EmailUploadButtons';
import Templates from './Templates';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';

export { Typeahead, AsyncTypeahead };


const EmailInput = props => {
  let message = props;
  let replyAll = props.toggle;
  //console.log('replyAll?',replyAll)
  let subreply;
  subreply = localStorage.getItem('subreply', 'subreply');
  const [templates, setTemplates] = useState(false);
  const [attachsliced, setAttachsliced] = useState([]);

  const toRecipients = message.props.toRecipients.map(item => {
    const container = {};
    container['address'] = item.emailAddress.address;
    return container;
  });
  let obj = {};
  obj['address'] = message.props.from.emailAddress.address;
  let replyAlloptions = toRecipients;
  replyAlloptions.push(obj);

  const [state, setState] = useState({
    ...props,
    replyall: replyAll,
    mailid: message.props.id,
    to: message.props.toRecipients, //message.props.sender.emailAddress.address,
    cc: 'cc',
    subject: message.props.subject,
    textarea: '',
    attachments: [
      {
        '@odata.type': '#microsoft.graph.fileAttachment',
        name: '',
        contentType: '',
        contentBytes: ''
      }
    ]
  });
  let messagestate = '';
  messagestate = state;

  const handleOnfocus = e => {
    const { name } = e.target;

    setState({ ...state, [name]: true });
  };

  const handleOnBlur = e => {
    setState({ ...state, textarea: e.target.value });
  };

  /* useEffect(() => {
    console.log('email input Toggle',props)
     
   }, []); */

  return (
    <EmailInputContainer>
      <div className="email-input-inner-container">
      {state.replyall=props.toggle}
        {props.toggle 
        ? (          
          <Typeahead          
            className="email-input"
            id={state.mailid}
            options={replyAlloptions} //message.props.toRecipients}
            defaultSelected={replyAlloptions} //{message.props.toRecipients}
            multiple
            labelKey={option => `${option.address}`}
          />
         ):
         (
         <Input
            className="email-input"
            name="to"
            defaultValue={
              subreply === 'subreply'
                ? message.props.sender.emailAddress.address
                : message.props.from.emailAddress.address
            }
            placeholder="To"
            // onFocus={e => handleOnfocus(e)}
            // onBlur={e => handleOnBlur(e)}
          />
        )}

        {/* //rawi0105 <Typeahead
          className="email-input"
          id={state.mailid}
          options={message.props.toRecipients}
          defaultSelected={message.props.toRecipients}
          multiple
          labelKey={option => `${option.emailAddress.address}`}
        />
        <Input
          className="email-input"
          name="to"
          defaultValue={
            subreply === 'subreply'
              ? message.props.sender.emailAddress.address
              : message.props.from.emailAddress.address
          }
          placeholder="To"
          // onFocus={e => handleOnfocus(e)}
          // onBlur={e => handleOnBlur(e)}
        /> */}
        {state.to && (
          <EmailCloseButtonContainer>
            <FontAwesomeIcon icon={Icons.faTimes} />
          </EmailCloseButtonContainer>
        )}
        
      </div>
      <div className="email-input-inner-container">
        <Input
          className="email-input"
          name="cc"
          placeholder="Cc"
          defaultValue={'Cc: ' + message.props.ccRecipients}
          // onFocus={e => handleOnfocus(e)}
          // onBlur={e => handleOnBlur(e)}
        />
        {state.cc && (
          <EmailCloseButtonContainer>
            <FontAwesomeIcon icon={Icons.faTimes} />
          </EmailCloseButtonContainer>
        )}
      </div>
      <div className="email-input-inner-container">
        <Input
          className="email-input"
          name="subject"
          placeholder="Subject"
          defaultValue={'Subject: ' + message.props.subject}
          //onFocus={e => handleOnfocus(e)}
          //onBlur={e => handleOnBlur(e)}
        />
        {state.subject && (
          <EmailCloseButtonContainer>
            <FontAwesomeIcon icon={Icons.faTimes} />
          </EmailCloseButtonContainer>
        )}
      </div>
      <div className="email-textarea-inner-container">
        <EmailTextArea
          placeholder="Type Your Email Here"
          name="textarea"
          //  onFocus={e => handleOnfocus(e)}
          onBlur={e => handleOnBlur(e)}
        />
        {state.textarea && (
          <EmailCloseButtonContainer>
            <FontAwesomeIcon icon={Icons.faTimes} />
          </EmailCloseButtonContainer>
        )}
      </div>

      <EmailUploadButtons       
      setTemplates={setTemplates} 
      state={state}
        messagestate={messagestate}
        setState={setState}
        setAttachsliced={setAttachsliced}
      
      />
      {templates && <Templates />}
      <EmailActionButtons
        data={state}
        /*  atta={attachsliced} */
      />
    </EmailInputContainer>
  );
};

export default EmailInput;
