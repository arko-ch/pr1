import React, { Component } from "react";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  UncontrolledButtonDropdown,
  Label,
  Card,
  ButtonGroup
} from "reactstrap";
//07/09 deployment pre full capability
import { Library as Icons, FontAwesomeIcon } from '../../../app/icons'

class MailAttachment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attachments: []
    };

    this.base64ToArrayBuffer = this.base64ToArrayBuffer.bind(this);
    this.createAndDownloadBlobFile = this.createAndDownloadBlobFile.bind(this);
  }

  componentDidMount() {
    fetch(`/mailn/listattachments/` + this.props.attachedfile)
      .then(res => res.json())
      .then(res => {
        this.setState({
          attachments: res.parsedBody.value
        });
      });
  }
  initializeAttachments(contentBytes, fn) {
    alert("downloading attachment");
    const data = contentBytes; // assume you have the data here

    const arrayBuffer = this.base64ToArrayBuffer(data);
    this.createAndDownloadBlobFile(arrayBuffer, fn);
  }

  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  }

  createAndDownloadBlobFile(body, filename) {
    const blob = new Blob([body]);
    const fileName = `${filename}`;
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement("a");
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);

        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  render() {
    const attachmentList = this.state.attachments.map(attachment => {
      return (
        <div key={attachment.id}>
          <FontAwesomeIcon icon={Icons.faPaperclip} className="mr-2" />
          <ButtonGroup className="mr-2">
            <Button
              onClick={() =>
                this.initializeAttachments(
                  attachment.contentBytes,
                  attachment.name
                )
              }
              color="info"
            >
              <FontAwesomeIcon icon={Icons.faEye} />
            </Button>
            <UncontrolledButtonDropdown
              onClick={() =>
                this.initializeAttachments(
                  attachment.contentBytes,
                  attachment.name
                )
              }
              direction="right"
            >
              <DropdownToggle color="info" caret>
                <FontAwesomeIcon icon={Icons.faFilePdf} /> {attachment.name}
                <i class="fas fa-cog"></i>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header> NJ - G98S38 </DropdownItem>

                <UncontrolledButtonDropdown direction="right">
                  <DropdownToggle caret>Searches </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem toggle={false}>
                      <FormGroup check className="allow-click">
                        <Label check>
                          <Input type="checkbox" id="checkbox2" />
                          <FontAwesomeIcon icon={Icons.faLock} />
                          &nbsp;Sensitive
                        </Label>
                      </FormGroup>
                    </DropdownItem>
                    <DropdownItem>
                      <FontAwesomeIcon icon={Icons.faCheck} />
                      &nbsp;Searches
                    </DropdownItem>
                    <DropdownItem> Commitment / Clearance </DropdownItem>
                    <DropdownItem> Payoff / Invoice </DropdownItem>
                    <DropdownItem> Policy </DropdownItem>
                    <DropdownItem> Other </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>

                <UncontrolledButtonDropdown direction="right">
                  <DropdownToggle caret>Commitment / Clear </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem toggle={false}>
                      <FormGroup check className="allow-click">
                        <Label check>
                          <Input type="checkbox" id="checkbox2" />
                          <FontAwesomeIcon icon={Icons.faLock} />
                          &nbsp;Sensitive
                        </Label>
                      </FormGroup>
                    </DropdownItem>
                    <DropdownItem>
                      <FontAwesomeIcon icon={Icons.faCheck} />
                      &nbsp;Searches
                    </DropdownItem>
                    <DropdownItem> Commitment / Clearance </DropdownItem>
                    <DropdownItem> Payoff / Invoice </DropdownItem>
                    <DropdownItem> Policy </DropdownItem>
                    <DropdownItem> Other </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>

                <UncontrolledButtonDropdown direction="right">
                  <DropdownToggle caret>Payoff / Invoice </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem toggle={false}>
                      <FormGroup check className="allow-click">
                        <Label check>
                          <Input type="checkbox" id="checkbox2" />
                          <FontAwesomeIcon icon={Icons.faLock} />
                          &nbsp;Sensitive
                        </Label>
                      </FormGroup>
                    </DropdownItem>
                    <DropdownItem>
                      <FontAwesomeIcon icon={Icons.faCheck} />
                      &nbsp;Searches
                    </DropdownItem>
                    <DropdownItem> Commitment / Clearance </DropdownItem>
                    <DropdownItem> Payoff / Invoice </DropdownItem>
                    <DropdownItem> Policy </DropdownItem>
                    <DropdownItem> Other </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>

                <UncontrolledButtonDropdown direction="right">
                  <DropdownToggle caret>Policy </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem toggle={false}>
                      <FormGroup check className="allow-click">
                        <Label check>
                          <Input type="checkbox" id="checkbox2" />
                          <FontAwesomeIcon icon={Icons.faLock} />
                          &nbsp;Sensitive
                        </Label>
                      </FormGroup>
                    </DropdownItem>
                    <DropdownItem>
                      <FontAwesomeIcon icon={Icons.faCheck} />
                      &nbsp;Searches
                    </DropdownItem>
                    <DropdownItem> Commitment / Clearance </DropdownItem>
                    <DropdownItem> Payoff / Invoice </DropdownItem>
                    <DropdownItem> Policy </DropdownItem>
                    <DropdownItem> Other </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>

                <UncontrolledButtonDropdown direction="right">
                  <DropdownToggle caret>Other </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem toggle={false}>
                      <FormGroup check className="allow-click">
                        <Label check>
                          <Input type="checkbox" id="checkbox2" />
                          <FontAwesomeIcon icon={Icons.faLock} />
                          &nbsp;Sensitive
                        </Label>
                      </FormGroup>
                    </DropdownItem>
                    <DropdownItem>
                      <FontAwesomeIcon icon={Icons.faCheck} />
                      &nbsp;Searches
                    </DropdownItem>
                    <DropdownItem> Commitment / Clearance </DropdownItem>
                    <DropdownItem> Payoff / Invoice </DropdownItem>
                    <DropdownItem> Policy </DropdownItem>
                    <DropdownItem> Other </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </ButtonGroup>
        </div>
      );
    });
    return (
      <div className="mail-list">
        {/* <Row className="sorted-unsorted">
                                <h5>Attachment</h5>
                        </Row> */}
        {attachmentList}
      </div>
    );
  }
}

export default MailAttachment;

