import React, { Component } from 'react';
import {
  Button,
  Col,
  Collapse,
  Container,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Row,
  UncontrolledButtonDropdown,
  UncontrolledTooltip,
  Form,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormText,
  ButtonGroup
} from 'reactstrap';

import { Library as Icons, FontAwesomeIcon } from '../../../app/icons';

import avatar1 from '../../../assets/architect/utils/images/avatars/1.jpg';
import avatar2 from '../../../assets/architect/utils/images/avatars/2.jpg';
import avatar6 from '../../../assets/architect/utils/images/avatars/8.jpg';
//import avatar7 from '../../../assets/architect/utils/images/avatars/9.jpg';
//import avatar8 from '../../../assets/architect/utils/images/avatars/10.jpg';

//import MailItem from './mailItem';
import Moment from 'react-moment';
import FileBase64 from 'react-file-base64';
import MailAttachment from './mailAttachment';

class MailList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      accordion: [false, false, false, false, false, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      modalreply: false,
      unmountOnClose: true,
      currentItemId: undefined,
      messageReply: '',
      showemailThread: false,
      filen: undefined,
      attachmentfilename: undefined,
      selectedFilename: null,
      selectedFilesize: undefined,
      selectedFilecontentBytes: undefined,
      draftEmailID: undefined,
      draftReply: undefined,
      filenx: undefined,
      contentSize: undefined,
      files: [],
      attachedfile: []
    };

    this.handlereplymsgChange = this.handlereplymsgChange.bind(this);
    this.togglereply = this.togglereply.bind(this);
    this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.togglereply.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.toggleModalFunc = this.toggleModalFunc.bind(this);
    this.base64ToArrayBuffer = this.base64ToArrayBuffer.bind(this);
    this.createAndDownloadBlobFile = this.createAndDownloadBlobFile.bind(this);
  }

  getFiles(files) {
    this.setState({ files: files });
  }

  fileUploadHandler = () => {
    //this.setState({ filenx:this.fileInput.current.files[0].name })
  };

  handlereplymsgChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  toggleModalFunc(id) {
    const currentItemId = id; //!== this.state.currentItemId ? id : undefined
    this.setState({ currentItemId });
    this.togglereply();
  }

  togglereply() {
    this.setState(prevState => ({
      modalreply: !prevState.modalreply
    }));
  }

  async creplyemail(mid, commentbody, subject) {
    try {
      await fetch('http://localhost:3001/mailn/creply/' + mid, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          receivedDateTime: new Date().toISOString(),
          sentDateTime: new Date().toISOString(),
          hasAttachments: true,
          subject: subject,
          body: {
            contentType: 'html',
            content: commentbody
          },
          bodyPreview: commentbody
        })
      });

      await fetch('http://localhost:3001/mailn/getdraft/')
        .then(res => res.json())
        .then(res => {
          const draftid = res.parsedBody.value[0].id;
          const replythread = res.parsedBody.value[0].body.content;

          this.setState({ draftEmailID: draftid, draftReply: replythread });
          //console.log(this.state.draftEmailID)
        });

      await fetch(
        'http://localhost:3001/mailn/updatedraft/' + this.state.draftEmailID,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            contentType: 'html',
            content: this.state.messageReply + this.state.draftReply + '\r\n'
          })
        }
      );

      // need to put this for now, cause of the await asynch process of this, we cant use the lambda expression for now, but soon this code will be replaced
      var index;
      var filearray = this.state.files;
      for (index = 0; index < filearray.length; ++index) {
        var fileiterator = filearray[index];
        const x = fileiterator.base64;
        var split1,
          split2 = x.split(',');
        var contentbyteArray = split2;
        await fetch(
          'http://localhost:3001/mailn/addattachment/' +
            this.state.draftEmailID,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              '@0odata.type': '#microsoft.graph.fileAttachment',
              name: fileiterator.name,
              contentBytes: contentbyteArray[1]
            })
          }
        );
      }

      await fetch(
        'http://localhost:3001/mailn/dsend/' + this.state.draftEmailID,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (err) {
      //handle error
    }

    this.togglereply();
  }

  changeUnmountOnClose(e) {
    let value = e.target.value;
    this.setState({ unmountOnClose: value });
  }

  initializeAttachments() {
    alert('downloading attachment');
    const data = this.props.attachments[1].contentBytes; // assume you have the data here
    const arrayBuffer = this.base64ToArrayBuffer(data);
    this.createAndDownloadBlobFile(arrayBuffer, this.props.attachments[1].name);
  }

  //method in converting to base64 files
  //base64ToArrayBuffer(base64) {
  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  }

  createAndDownloadBlobFile(body, filename, extension = 'pdf') {
    const blob = new Blob([body]);
    const fileName = `${filename}.${extension}`;
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);

        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  async getAttachements(mid) {
    fetch(`http://localhost:3001/mailn/listattachments/` + mid)
      .then(res => res.json())
      .then(res => {
        //console.log(res.parsedBody.value)
        this.setState({
          attachedfile: res.parsedBody.value
        });
        //return res.parsedBody.value;
      });
  }

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  showChatBox() {
    document.getElementById('Tooltip-1').click();
  }

  render() {
    const { data } = this.props;
    const dateToFormat = this.receivedDateTime;
    const emailList = data.map(mail => {
      return (
        <div key={mail.id}>
          <Container fluid={true} className="mailList">
            <Row
              className="mailItem sorted"
              onMouseEnter={() => this.toggleAccordion(0)}
              aria-expanded={this.state.accordion[0]}
              aria-controls="collapseOne"
            >
              <Row className="sorted-overlay ml-0">
                <Col xs="1">&nbsp;</Col>
                <Col xs="2" className="vertical-center-div">
                  <UncontrolledButtonDropdown direction="right">
                    <DropdownToggle color="warning" caret>
                      Sort email
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <strong>NJ-Z9382</strong>
                        <br />
                        123 Main Street Appleville, NJ 08518
                      </DropdownItem>
                      <DropdownItem>
                        <strong>NJ-A4827</strong> <br />
                        34 Market St. Jacksonville, NJ 08518
                      </DropdownItem>
                      <DropdownItem>
                        <strong>NY-P9348</strong> <br />
                        558 Maple Street Mapleville, NY 06784
                      </DropdownItem>
                      <DropdownItem>
                        <strong>NJ-Z9382</strong>
                        <br />
                        123 Main Street Appleville, NJ 08518
                      </DropdownItem>
                      <DropdownItem>
                        <strong>NJ-A4827</strong> <br />
                        34 Market St. Jacksonville, NJ 08518
                      </DropdownItem>
                      <DropdownItem>
                        <strong>NY-P9348</strong> <br />
                        558 Maple Street Mapleville, NY 06784
                      </DropdownItem>
                      <DropdownItem>
                        <strong>NJ-Z9382</strong>
                        <br />
                        123 Main Street Appleville, NJ 08518
                      </DropdownItem>
                      <DropdownItem>
                        <strong>NJ-A4827</strong> <br />
                        34 Market St. Jacksonville, NJ 08518
                      </DropdownItem>
                      <DropdownItem>
                        <strong>NY-P9348</strong> <br />
                        558 Maple Street Mapleville, NY 06784
                      </DropdownItem>
                      <DropdownItem>
                        <strong>NJ-Z9382</strong>
                        <br />
                        123 Main Street Appleville, NJ 08518
                      </DropdownItem>
                      <DropdownItem>
                        <strong>NJ-A4827</strong> <br />
                        34 Market St. Jacksonville, NJ 08518
                      </DropdownItem>
                      <DropdownItem>
                        <strong>NY-P9348</strong> <br />
                        558 Maple Street Mapleville, NY 06784
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </Col>
              </Row>
              <Col xs="1" className="text-center">
                <CustomInput type="checkbox" id="email1" />
              </Col>
              <Col xs="2" className="vertical-center-div ">
                <p className="mb-0">
                  {' '}
                  From {mail.from.emailAddress.name} <b></b>
                </p>
              </Col>
              <Col md="3" className="vertical-center-div">
                <p className="mb-0"> Subject: {mail.subject} </p>
              </Col>
              <Col xs="2" className="vertical-center-div text-center">
                <ButtonGroup>
                  <Button
                    itemID={mail.id}
                    onClick={() => this.toggleModalFunc(mail.id)}
                    color="info"
                    id="Reply-1"
                  >
                    <FontAwesomeIcon color="red" icon={Icons.faReply} />
                    {this.state.currentItemId === mail.id ? (
                      <div>
                        <div>
                          <Form inline onSubmit={e => e.preventDefault()}>
                            {' '}
                          </Form>

                          <Modal
                            size="lg"
                            backdrop={true}
                            isOpen={this.state.modalreply}
                            toggle={this.togglereply}
                            unmountOnClose={this.state.unmountOnClose}
                          >
                            <ModalHeader toggle={this.togglereply}>
                              Reply Email
                            </ModalHeader>
                            <ModalBody>
                              {/* <Input type="textarea" placeholder="Write something (data should remain in modal if unmountOnClose is set to false)" rows={5} /> */}
                              <p className="mb-0">
                                {' '}
                                {mail.from.emailAddress.name} |{' '}
                                {mail.from.emailAddress.address}
                                <b></b>
                              </p>
                              <FormGroup></FormGroup>

                              <FormGroup row>
                                <Col md="3" className="vertical-center-div">
                                  Subject: {mail.subject}
                                </Col>
                                {/* <p className="mb-0"> {mail.subject} </p> */}

                                <Container>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: mail.body.content
                                    }}
                                  />
                                  <Row>
                                    <Col md={12}>
                                      <div className="lined-text"></div>
                                      <div
                                        className={'text-center lined-text-p'}
                                      >
                                        <span>Reply Below</span>
                                      </div>
                                    </Col>
                                  </Row>
                                </Container>
                              </FormGroup>

                              <FormGroup>
                                <Label for="exampleText">Message </Label>
                                <Input
                                  type="textarea"
                                  placeholder="Type your reply here"
                                  name="messageReply"
                                  id="exampleText"
                                  value={this.state.messageReply}
                                  onChange={this.handlereplymsgChange}
                                />
                              </FormGroup>

                              <FormGroup>
                                <Label for="exampleFile">Attachment</Label>

                                <FileBase64
                                  multiple={true}
                                  onDone={this.getFiles.bind(this)}
                                />
                                <FormText color="muted">
                                  Attach your File here. Ensure file size is not
                                  4mb
                                </FormText>
                              </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                              {/* <Button color="primary" onClick={this.togglereply}>Send</Button>{' '} */}
                              <Button
                                color="primary"
                                onClick={() =>
                                  this.creplyemail(
                                    mail.id,
                                    this.state.messageReply,
                                    mail.subject
                                  )
                                }
                              >
                                Send
                              </Button>{' '}
                              <Button
                                color="secondary"
                                onClick={this.togglereply}
                              >
                                Cancel
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </div>
                      </div>
                    ) : null}
                  </Button>
                  <Button color="info" id="Reply-All-1">
                    <FontAwesomeIcon icon={Icons.faReplyAll} />
                  </Button>
                  <Button color="info" id="Forward-1">
                    <FontAwesomeIcon icon={Icons.faForward} />
                  </Button>
                </ButtonGroup>

                <UncontrolledTooltip placement="bottom" target={'Reply-1'}>
                  Reply
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target={'Reply-All-1'}>
                  Reply All
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target={'Forward-1'}>
                  Forward
                </UncontrolledTooltip>
              </Col>

              <Col xs="2" className="vertical-center-div text-center">
                <div className="avatar-wrapper avatar-wrapper-overlap">
                  <div
                    className="avatar-icon-wrapper avatar-icon-sm"
                    id="Avatar-1"
                    onClick={this.showChatBox}
                  >
                    <div className="avatar-icon">
                      <img
                        width={40}
                        className="rounded-circle"
                        src={avatar1}
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className="avatar-icon-wrapper avatar-icon-sm"
                    id="Avatar-2"
                    onClick={this.showChatBox}
                  >
                    <div className="avatar-icon">
                      <img
                        width={40}
                        className="rounded-circle"
                        src={avatar2}
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className="avatar-icon-wrapper avatar-icon-sm"
                    id="Avatar-6"
                    onClick={this.showChatBox}
                  >
                    <div className="avatar-icon">
                      <img
                        width={40}
                        className="rounded-circle"
                        src={avatar6}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <UncontrolledTooltip placement="bottom" target={'Avatar-1'}>
                  John Doe
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target={'Avatar-2'}>
                  Ruben Tillman
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target={'Avatar-6'}>
                  John Doe
                </UncontrolledTooltip>

                {mail.hasAttachments ? (
                  <FontAwesomeIcon
                    className="text-info"
                    icon={Icons.faPaperclip}
                    size="lg"
                  />
                ) : null}
              </Col>
              <Col xs="2" className="vertical-center-div">
                <FontAwesomeIcon
                  className="opacity-4 mr-2"
                  icon={Icons.faStopwatch}
                />
                <Moment date={mail.receivedDateTime} durationFromNow />
              </Col>
            </Row>

            <Collapse
              isOpen={this.state.accordion[0]}
              id="collapseOne"
              aria-labelledby="headingOne"
              className="emailBody"
            >
              <Row className="mb-2">
                <Col md="2" className="text-right">
                  <b>{mail.from.emailAddress.address}</b>
                  <br />
                  <small className="opacity-6">
                    <FontAwesomeIcon
                      icon={Icons.faStopwatch}
                      className="mr-1"
                    />
                    <Moment date={mail.receivedDateTime} durationFromNow />
                  </small>
                  <br />
                </Col>
                <Col md="9">
                  <div className="chat-box-wrapper m-0 p-0">
                    <div className="chat-box">
                      <p>{mail.bodyPreview}</p>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="lined-text"></div>
                  <div className={'text-center lined-text-p'}>
                    {/* <span>You viewed the below email(s) ago</span> */}
                  </div>
                </Col>
              </Row>

              {mail.hasAttachments ? (
                <MailAttachment attachedfile={mail.id} />
              ) : null}
              {/*  {mail.hasAttachments ? <MailAttachment attachedfile={(mail.id)} /> : null} */}

              {/* <FontAwesomeIcon icon={Icons.faPaperclip} className="mr-2" />

              <ButtonGroup className="mr-2">
                <Button color="info"><FontAwesomeIcon icon={Icons.faEye} /></Button>
                <UncontrolledButtonDropdown direction="right">
                  <DropdownToggle color="info" caret>
                    <FontAwesomeIcon icon={Icons.faFilePdf} /> 123MainSearch.pdf
                </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Save File</DropdownItem>

                    <UncontrolledButtonDropdown direction="right">
                      <DropdownToggle caret>
                        NJ-Z9382
                    </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem toggle={false}>
                          <FormGroup check className="allow-click">
                            <Label check>
                              <Input type="checkbox" id="checkbox2" />{' '}
                              <FontAwesomeIcon icon={Icons.faLock} />&nbsp;Sensitive
                          </Label>
                          </FormGroup>
                        </DropdownItem>
                        <DropdownItem><FontAwesomeIcon icon={Icons.faCheck} />&nbsp;Searches</DropdownItem>
                        <DropdownItem>Commitment/Clearance</DropdownItem>
                        <DropdownItem>Payoff/Invoice</DropdownItem>
                        <DropdownItem>Policy</DropdownItem>
                        <DropdownItem>Other</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>

                    <UncontrolledButtonDropdown direction="right">
                      <DropdownToggle caret>
                        NY-P9348
                    </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem toggle={false}>
                          <FormGroup check className="allow-click">
                            <Label check>
                              <Input type="checkbox" id="checkbox2" />{' '}
                              <FontAwesomeIcon icon={Icons.faLock} />&nbsp;Sensitive
                          </Label>
                          </FormGroup>
                        </DropdownItem>
                        <DropdownItem><FontAwesomeIcon icon={Icons.faCheck} />&nbsp;Searches</DropdownItem>
                        <DropdownItem>Commitment/Clearance</DropdownItem>
                        <DropdownItem>Payoff/Invoice</DropdownItem>
                        <DropdownItem>Policy</DropdownItem>
                        <DropdownItem>Other</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>

                    <UncontrolledButtonDropdown direction="right">
                      <DropdownToggle caret>
                        NY-A0391
                    </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem toggle={false}>
                          <FormGroup check className="allow-click">
                            <Label check>
                              <Input type="checkbox" id="checkbox2" />{' '}
                              <FontAwesomeIcon icon={Icons.faLock} />&nbsp;Sensitive
                          </Label>
                          </FormGroup>
                        </DropdownItem>
                        <DropdownItem><FontAwesomeIcon icon={Icons.faCheck} />&nbsp;Searches</DropdownItem>
                        <DropdownItem>Commitment/Clearance</DropdownItem>
                        <DropdownItem>Payoff/Invoice</DropdownItem>
                        <DropdownItem>Policy</DropdownItem>
                        <DropdownItem>Other</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </ButtonGroup>

              

              <ButtonGroup className="mr-2">
                <Button color="info"><FontAwesomeIcon icon={Icons.faEye} /></Button>
                <UncontrolledButtonDropdown direction="right">
                  <DropdownToggle color="info" caret>
                    <FontAwesomeIcon icon={Icons.faFileExcel} /> 
                </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Save File</DropdownItem>

                    <UncontrolledButtonDropdown direction="right">
                      <DropdownToggle caret>
                        NJ-Z9382
                    </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem toggle={false}>
                          <FormGroup check className="allow-click">
                            <Label check>
                              <Input type="checkbox" id="checkbox2" />{' '}
                              <FontAwesomeIcon icon={Icons.faLock} />&nbsp;Sensitive
                          </Label>
                          </FormGroup>
                        </DropdownItem>
                        <DropdownItem><FontAwesomeIcon icon={Icons.faCheck} />&nbsp;Searches</DropdownItem>
                        <DropdownItem>Commitment/Clearance</DropdownItem>
                        <DropdownItem>Payoff/Invoice</DropdownItem>
                        <DropdownItem>Policy</DropdownItem>
                        <DropdownItem>Other</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>

                    <UncontrolledButtonDropdown direction="right">
                      <DropdownToggle caret>
                        NY-P9348
                    </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem toggle={false}>
                          <FormGroup check className="allow-click">
                            <Label check>
                              <Input type="checkbox" id="checkbox2" />{' '}
                              <FontAwesomeIcon icon={Icons.faLock} />&nbsp;Sensitive
                          </Label>
                          </FormGroup>
                        </DropdownItem>
                        <DropdownItem><FontAwesomeIcon icon={Icons.faCheck} />&nbsp;Searches</DropdownItem>
                        <DropdownItem>Commitment/Clearance</DropdownItem>
                        <DropdownItem>Payoff/Invoice</DropdownItem>
                        <DropdownItem>Policy</DropdownItem>
                        <DropdownItem>Other</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>

                    <UncontrolledButtonDropdown direction="right">
                      <DropdownToggle caret>
                        NY-A0391
                    </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem toggle={false}>
                          <FormGroup check className="allow-click">
                            <Label check>
                              <Input type="checkbox" id="checkbox2" />{' '}
                              <FontAwesomeIcon icon={Icons.faLock} />&nbsp;Sensitive
                          </Label>
                          </FormGroup>
                        </DropdownItem>
                        <DropdownItem><FontAwesomeIcon icon={Icons.faCheck} />&nbsp;Searches</DropdownItem>
                        <DropdownItem>Commitment/Clearance</DropdownItem>
                        <DropdownItem>Payoff/Invoice</DropdownItem>
                        <DropdownItem>Policy</DropdownItem>
                        <DropdownItem>Other</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </ButtonGroup>

              <ButtonGroup className="mr-2">
                <Button onClick={this.initializeAttachments.bind(this)} color="light"><FontAwesomeIcon icon={Icons.faEye} /></Button>
                <UncontrolledButtonDropdown onClick={this.initializeAttachments.bind(this)} direction="right">
                  <DropdownToggle color="light" caret>
                    <FontAwesomeIcon icon={Icons.faFileWord} /> AffidavitofTitle123Main.doc                
                  </DropdownToggle>

                  <DropdownMenu>
                    <DropdownItem header>Save File</DropdownItem>
                    <UncontrolledButtonDropdown direction="right">
                      <DropdownToggle caret>
                        NJ-Z9382
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem toggle={false}>
                          <FormGroup check className="allow-click">
                            <Label check>
                              <Input type="checkbox" id="checkbox2" />{' '}
                              <FontAwesomeIcon icon={Icons.faLock} />&nbsp;Sensitive               
                            </Label>
                          </FormGroup>
                        </DropdownItem>
                        <DropdownItem><FontAwesomeIcon icon={Icons.faCheck} />&nbsp;Searches</DropdownItem>
                        <DropdownItem>Commitment/Clearance</DropdownItem>
                        <DropdownItem>Payoff/Invoice</DropdownItem>
                        <DropdownItem>Policy</DropdownItem>
                        <DropdownItem>Other</DropdownItem>
                      </DropdownMenu>

                    </UncontrolledButtonDropdown>
                    <UncontrolledButtonDropdown direction="right">
                      <DropdownToggle caret>
                        NY-P9348                
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem toggle={false}>
                          <FormGroup check className="allow-click">
                            <Label check>
                              <Input type="checkbox" id="checkbox2" />{' '}
                              <FontAwesomeIcon icon={Icons.faLock} />&nbsp;Sensitive               
                            </Label>
                          </FormGroup>
                        </DropdownItem>
                        <DropdownItem><FontAwesomeIcon icon={Icons.faCheck} />&nbsp;Searches</DropdownItem>
                        <DropdownItem>Commitment/Clearance</DropdownItem>
                        <DropdownItem>Payoff/Invoice</DropdownItem>
                        <DropdownItem>Policy</DropdownItem>
                        <DropdownItem>Other</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    <UncontrolledButtonDropdown direction="right">
                      <DropdownToggle caret>
                        NY-A0391              
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem toggle={false}>
                          <FormGroup check className="allow-click">
                            <Label check>
                              <Input type="checkbox" id="checkbox2" />{' '}
                              <FontAwesomeIcon icon={Icons.faLock} />&nbsp;Sensitive                
                            </Label>
                          </FormGroup>
                        </DropdownItem>
                        <DropdownItem><FontAwesomeIcon icon={Icons.faCheck} />&nbsp;Searches</DropdownItem>
                        <DropdownItem>Commitment/Clearance</DropdownItem>
                        <DropdownItem>Payoff/Invoice</DropdownItem>
                        <DropdownItem>Policy</DropdownItem>
                        <DropdownItem>Other</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    </DropdownMenu>
                    </UncontrolledButtonDropdown>
            </ButtonGroup> */}
            </Collapse>
          </Container>
        </div>
      );
    });

    return (
      <div className="mail-list">
        <Row className="sorted-unsorted">
          <h5>Unsorted (20) (View All)</h5>
        </Row>
        {emailList}
      </div>
    );
  }
}
export default MailList;
