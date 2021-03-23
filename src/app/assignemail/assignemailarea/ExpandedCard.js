import React from 'react';
import { Row, Col } from 'reactstrap';

import icoHammer from './../../../assets/images/icoHammer.svg';
import icoAttchment from './../../../assets/images/icoattachment.svg';
import icoComments from './../../../assets/images/icocomments.svg';
import icoPdf from './../../../assets/images/icopdf.svg';
import icoScreenshot from './../../../assets/images/icoscreenshot.svg';
import icoReply from './../../../assets/images/icoreply.svg';
import icoReplyAll from './../../../assets/images/icoreplyall.svg';
import icoCheck from './../../../assets/images/icocheck.svg';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faAngleDown,
  faAngleUp
} from '@fortawesome/free-solid-svg-icons';
import ContextMenu from './ContextMenu';

const ButtonSpan = styled.span`
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  margin-right: 5px;
  &:hover {
    background-color: #e2e6f0;
  }
  & img {
    margin: 2px 6px 2px 6px;
  }
`;

const HoverButtons = styled.div`
  width: 143px;
  height: 32px;
  position: absolute;
  margin-right: 15px;
  right: 0;
  top: 18px;
  display: none;
  &:hover {
    display: flex;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #e1e1e1;
  background-color: #f7f8fa;
  &:hover {
    background-color: #eff1f5;
    ${HoverButtons} {
      display: flex;
    }
  }
`;

class ExpandedCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isBadge = this.props.Badge ? true : false;
    const isImportant = this.props.Important ? true : false;
    const isEncrypted = this.props.Encrypted ? true : false;
    const isCCEmail = this.props.CCEmail ? true : false;
    const isMultipleAttachment = this.props.MultipleAttachment ? true : false;
    const isMultipleComments = this.props.MultipleComments ? true : false;
    const isPdfAttachment = this.props.PdfAttachment ? true : false;
    const isSSAttachment = this.props.SSAttachment ? true : false;
    const isPrimary = this.props.Primary ? true : false;
    const lock = <FontAwesomeIcon icon={faLock} />;
    const angleDown = <FontAwesomeIcon icon={faAngleDown} />;
    const angleUp = <FontAwesomeIcon icon={faAngleUp} />;
    const data = this.props.data;

    return (
      <div className="expanded">
        <Wrapper>
          <Row>
            <Col md="12">
              <HoverButtons>
                <ButtonSpan>
                  <img src={icoReply} />
                </ButtonSpan>
                <ButtonSpan>
                  <img src={icoReplyAll} />
                </ButtonSpan>
                <ButtonSpan>
                  <img src={icoCheck} />
                </ButtonSpan>
                <ButtonSpan>
                  <ContextMenu />
                </ButtonSpan>
              </HoverButtons>
              <div className="profile_cards">
                <span className="profile_card">
                  <img src={data.userprofile} />
                </span>
                {data.isBadge ? (
                  <img className="card_profile_badge" src={icoHammer} />
                ) : (
                  ''
                )}
              </div>
              <div className="card_content_right">
                <div className="name">
                  {data.username}
                  <span>27 Nov 2020</span>
                </div>
                <div>
                  {isImportant ? (
                    <span className="imp tag">important</span>
                  ) : (
                    ''
                  )}
                  {isCCEmail ? (
                    <span className="cc tag">
                      CC:<span className="email">mahesh@intelliquity.in</span>
                    </span>
                  ) : (
                    ''
                  )}
                  {isEncrypted ? (
                    <span className="enc tag">encrypted {lock}</span>
                  ) : (
                    ''
                  )}
                </div>
                <div
                  className={
                    isPrimary
                      ? 'subject_container'
                      : 'subject_container_secondory'
                  }
                >
                  <span
                    className={
                      isPrimary
                        ? 'subject subject_primary'
                        : 'subject subject_secondory'
                    }
                  >
                    {data.subject}
                  </span>
                </div>
                {isMultipleAttachment ? (
                  <div className="attachment_holder">
                    <img className="" src={icoAttchment} />{' '}
                    <span className="attached_files">Attached Files (7)</span>
                  </div>
                ) : (
                  ''
                )}
                {data.attachments && data.attachments.length > 0 ? (
                  <div className="multiple_attachment">
                    {data.attachments.map(attachment => (
                      <div>
                        <img
                          src={
                            attachment.type == 'pdf' ? icoPdf : icoScreenshot
                          }
                        />
                        <span
                          className={attachment.type == 'img' ? 'doc_name' : ''}
                        >
                          {attachment.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  ''
                )}
                <div className="comments_save">
                  {isMultipleComments ? (
                    <div className="comments_holder">
                      <img className="" src={icoComments} />{' '}
                      <span className="comments">Comments (7)</span>
                    </div>
                  ) : (
                    ''
                  )}
                  {!isPrimary ? (
                    <div className="save_div">
                      <span>Save {angleDown}</span>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Wrapper>
      </div>
    );
  }
}
export default ExpandedCard;
