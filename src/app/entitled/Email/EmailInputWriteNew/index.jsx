import React, { useCallback, useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';
import {
  EmailInputContainer,
  EmailCloseButtonContainer,
  EmailTextArea
} from '../StyledComponents';
import EmailActionButtonsWriteNew from './../EmailInputWriteNew/EmailActionButtonsWriteNew';
import EmailUploadButtons from './EmailUploadButtons';
import Templates from './Templates';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import PersonList from '../../services/PersonList';

const EmailInput = ({toggleWriteNewClose}) => {
  //let message = props;
 
   
 
  //let prevmailid = localStorage.getItem('prevmailid', message.props.id)
  //localStorage.setItem('prevmailid', message.props.id)
  //console.log('email input props',message.props.sender.emailAddress.address)
  const [templates, setTemplates] = useState(false);
  const [attachsliced, setAttachsliced] = useState([]);
  const [toNewEmail, setToNewEmail] = useState([]);
  const [multiOptions, setMultiOptions] = useState([]);
  const [childState, setChildState] = useState(false);
  //attachsliced
  // const [templates, setTemplates] = useState(false);

  const [state, setState] = useState({
    to: [],
    cc: '',
    subject: '',
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


  
  function BasicUpload() {
    function getBase64(file, onLoadCallback) {
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const onDrop = useCallback(acceptedFiles => {
      acceptedFiles.forEach(file => {
        var promise = getBase64(file);
        promise.then(function(result) {
          // console.log('lengthe >0',acceptedFiles.length)
          messagestate.attachments.push({
            '@odata.type': '#microsoft.graph.fileAttachment',
            name: file.name,
            //contentType: file.type,
            contentBytes: result.split(',')[1]
          });
          let attachsliced = [];
          attachsliced = messagestate.attachments.slice(1);
          setAttachsliced(...attachsliced);
          setState({ ...state, attachments: attachsliced });
          console.log('message STATE', state);
        });
      });
    }, []);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      onDrop
    });

    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </div>
    );
  }

  const handleOnfocus = e => {
    const { name } = e.target;

    setState({ ...state, [name]: true });
  };

  const handleOnBlur = e => {
    //const { name } = e.target.value;

    if (e.target.name === 'to') {
      setState({ ...state, to: e.target.value });
      console.log('onbblurr TO', state, e.target.value);
    }

    if (e.target.name === 'cc') {
      setState({ ...state, cc: e.target.value });
      console.log('onbblurr cc', state, e.target.value);
    }

    if (e.target.name === 'subject') {
      setState({ ...state, subject: e.target.value });
      console.log('onbblurr subject', state, e.target.value);
    }

    if (e.target.name === 'textarea') {
      setState({ ...state, textarea: e.target.value });
      console.log('onbblurr textarea', state, e.target.value);
    }
  };

  

  const getEmailData = newEmailData => {
    const newEmail = newEmailData.map(data => data.label);
    setToNewEmail({
      ...toNewEmail,
      to: newEmail
    });
  };

  return (
    <EmailInputContainer>
      <div className="email-input-inner-container">
        <PersonList emailData={getEmailData} />
        {state.to && (
          <EmailCloseButtonContainer>
            <FontAwesomeIcon onClick={toggleWriteNewClose} icon={Icons.faTimes} />
          </EmailCloseButtonContainer>
        )}
      </div>
      <div className="email-input-inner-container">
        <Input
          className="email-input"
          name="cc"
          placeholder="Cc"
          //  defaultValue={'Cc: ' +message.props.ccRecipients}
          // onFocus={e => handleOnfocus(e)}
          onChange={e => handleOnBlur(e)}
        />
        {state.cc && (
          <EmailCloseButtonContainer >
            <FontAwesomeIcon  icon={Icons.faTimes} />
          </EmailCloseButtonContainer>
        )}
      </div>
      <div className="email-input-inner-container">
        <Input
          className="email-input"
          name="subject"
          placeholder="Subject"
          //defaultValue={'Subject: ' + message.props.subject}
          //onFocus={e => handleOnfocus(e)}
          onChange={e => handleOnBlur(e)}
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

          onChange={e => handleOnBlur(e)}
        />
        {state.textarea && (
          <EmailCloseButtonContainer>
            <FontAwesomeIcon icon={Icons.faTimes} />
          </EmailCloseButtonContainer>
        )}
      </div>
      {/* <BasicUpload /> */}
      <EmailUploadButtons
        setTemplates={setTemplates}
        state={state}
        messagestate={messagestate}
        setState={setState}
        setAttachsliced={setAttachsliced}
      />
      {templates && <Templates />}

      <EmailActionButtonsWriteNew
        data={state}
        toNewEmail={toNewEmail}
        multiOptions={multiOptions}
        /*  atta={attachsliced} */
      />
    </EmailInputContainer>
  );
};

export default EmailInput;
