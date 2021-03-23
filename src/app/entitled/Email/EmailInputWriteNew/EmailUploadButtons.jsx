import React, { useCallback } from 'react';
import { Col } from 'reactstrap';
import { EmailBlueButton, UploadButtons, Container } from '../StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';
import { useDropzone } from 'react-dropzone';
import { UploadContainer } from '../StyledComponents';
import UploadedFile from '../EmailMessageBox/UploadedFile';

const EmailUploadButtons = ({
  setTemplates,
  state,
  messagestate,
  setState,
  setAttachsliced
}) => {
  const UploadDropzone = () => {
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
            contentType: file.type,
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
      <UploadedFile key={file.path} label={file.path} />
    ));

    return (
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
        <UploadButtons>
          <FontAwesomeIcon icon={Icons.faPaperclip} />
        </UploadButtons>
        <UploadButtons>
          <FontAwesomeIcon icon={Icons.faImage} />
        </UploadButtons>
          <input {...getInputProps()} />
         {/*  <p>Drag 'n' drop some files here, or click to select files</p> */}
        </div>
        <UploadContainer>{files}</UploadContainer>
      </section>
    );
  };

  return (
    <Container className="mt-2">
      <Col className="p-0">
        <UploadDropzone />
        <EmailBlueButton onClick={() => setTemplates(true)}>
          <FontAwesomeIcon icon={Icons.faSortAmountDownAlt} className="mr-2" />
          Templates
        </EmailBlueButton>
      </Col>

    {/*   <Col className="p-0 align-right">
        <UploadButtons>
          <FontAwesomeIcon icon={Icons.faPaperclip} />
        </UploadButtons>
        <UploadButtons>
          <FontAwesomeIcon icon={Icons.faImage} />
        </UploadButtons>
      </Col> */}
    </Container>
  );
};

export default EmailUploadButtons;
