import React from "react";
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
  Label,
  Row,
  UncontrolledButtonDropdown,
  UncontrolledTooltip,
  ButtonGroup
} from 'reactstrap';

import { Library as Icons, FontAwesomeIcon } from '../../../app/icons';
import avatar1 from '../../../assets/architect/utils/images/avatars/1.jpg';
import avatar2 from '../../../assets/architect/utils/images/avatars/2.jpg';
import avatar6 from '../../../assets/architect/utils/images/avatars/8.jpg';
import avatar7 from '../../../assets/architect/utils/images/avatars/9.jpg';
import avatar8 from '../../../assets/architect/utils/images/avatars/10.jpg';

export default class MailItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: false
    }
  }

  showChatBox() {
  }

  toggleAccordion() {
    this.setState({
      accordion: !this.state.accordion
    })
  }

  render() {
    let sender = {}
    
    if (this.props.emails.sender && this.props.emails.sender.emailAddress) {
      sender = this.props.emails.sender.emailAddress;
    } else if (this.props.emails.from && this.props.emails.from.emailAddress) {
      sender = this.props.emails.from.emailAddress;
    }

    // <p>{this.props.emails.hasAttachments ? '[has attachments]' : ''}</p>
    // <p>{this.props.emails.isRead ? '[is read]' : ''}</p>
    
    return (
        <div>
          <Row className="mailItem urgent"
               onMouseEnter={() => this.toggleAccordion()}
               aria-expanded={this.state.accordion}
               aria-controls="collapseFour">
            <div className="urgent-overlay"><FontAwesomeIcon icon={Icons.faExclamationCircle}/></div>

            <Col xs="1" className="text-center">
              <CustomInput type="checkbox" id="email4"/>
            </Col>

            <Col xs="2" className="vertical-center-div ">
              <p className="mb-0">{sender.name}</p>
            </Col>

            <Col xs="3" className="vertical-center-div">
              {this.props.emails.subject}
            </Col>

            <Col xs="2" className="vertical-center-div text-center">
              <ButtonGroup>
                <Button color="info" id="Reply-4"><FontAwesomeIcon icon={Icons.faReply}/></Button>
                <Button color="info" id="Reply-All-4"><FontAwesomeIcon icon={Icons.faReplyAll}/></Button>
                <Button color="info" id="Forward-4"><FontAwesomeIcon icon={Icons.faForward}/></Button>
              </ButtonGroup>
              <UncontrolledTooltip placement="bottom" target={'Reply-4'}>
                Reply
              </UncontrolledTooltip>
              <UncontrolledTooltip placement="bottom" target={'Reply-All-4'}>
                Reply All
              </UncontrolledTooltip>
              <UncontrolledTooltip placement="bottom" target={'Forward-4'}>
                Forward
              </UncontrolledTooltip>
            </Col>

            <Col xs="2" className="vertical-center-div text-center">
              <div className="avatar-wrapper avatar-wrapper-overlap">
                <div className="avatar-icon-wrapper avatar-icon-sm" id="Avatar-6" onClick={this.showChatBox}>
                  <div className="avatar-icon">
                    <img width={40} className="rounded-circle"
                         src={avatar6}
                         alt=""/>
                  </div>
                </div>
                <div className="avatar-icon-wrapper avatar-icon-sm" id="Avatar-7" onClick={this.showChatBox}>
                  <div className="avatar-icon">
                    <img width={40} className="rounded-circle"
                         src={avatar7}
                         alt=""/>
                  </div>
                </div>
                <div className="avatar-icon-wrapper avatar-icon-sm" id="Avatar-8" onClick={this.showChatBox}>
                  <div className="avatar-icon">
                    <img width={40} className="rounded-circle"
                         src={avatar8}
                         alt=""/>
                  </div>
                </div>
              </div>
              <UncontrolledTooltip placement="bottom" target={'Avatar-6'}>
                John Doe
              </UncontrolledTooltip>
              <UncontrolledTooltip placement="bottom" target={'Avatar-7'}>
                Amy Wincliff
              </UncontrolledTooltip>
              <UncontrolledTooltip placement="bottom" target={'Avatar-8'}>
                Robert Maple
              </UncontrolledTooltip>
            </Col>
            <Col xs="2" className="vertical-center-div">
              <FontAwesomeIcon className="opacity-4 mr-2" icon={Icons.faCalendarAlt}/>
              2 Days Ago
            </Col>
          </Row>

          <Collapse isOpen={this.state.accordion} id="collapseFour" className="emailBody">
            {this.props.emails.bodyPreview}
          </Collapse>
        </div>
        )
  }
}