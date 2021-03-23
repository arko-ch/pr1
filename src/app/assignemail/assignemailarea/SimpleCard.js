import React from 'react';
import { Row, Col } from 'reactstrap';

import icoHammer from './../../../assets/images/icoHammer.svg';
import icoAttchment from './../../../assets/images/icoattachment.svg';
import Moment from 'react-moment';
import 'moment-timezone';
import cache from '../services/Cache';
import $mailBox from '../services/MailBox';

import icoComments from './../../../assets/images/icocomments.svg';
import icoPdf from './../../../assets/images/icopdf.svg';
import icoScreenshot from './../../../assets/images/icoscreenshot.svg';
import icoReply from './../../../assets/images/icoreply.svg';
import icoReplyAll from './../../../assets/images/icoreplyall.svg';
import icoCheck from './../../../assets/images/icocheck.svg';

// import profileOne from '../../../assets/images/profileOne.svg';
// import profileTwo from '../../../assets/images/profileTwo.svg';
// import profileThree from '../../../assets/images/profileThree.svg';

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
  &:hover {
    background-color: #f7f8fa;
    ${HoverButtons} {
      display: flex;
    }
  }
`;

class SimpleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      profileImages: [],
      attachmentCount: 0
    };

    this.fetchAvatars = this.fetchAvatars.bind(this);
    this.fecthAttachamentList = this.fecthAttachamentList.bind(this);
  }

  componentWillUnmount() {}

  async componentDidMount() {
    //console.log('didmount fetching avatar==>',this.props.children[2])
    await this.fetchAvatars(this.props.Id);
    if (this.props.MultipleAttachment) {
      await this.fecthAttachamentList(this.props.Id);
    }
  }

  async fecthAttachamentList(id) {
    let res = await $mailBox.getAttachmentsList(id);
    if (res.data.attachments.value) {
      this.setState({ attachmentCount: res.data.attachments.value.length });
    }
  }

  async fetchAvatars(id) {
    let res = await cache.request(`mail-avatars-${id}`, () => {
      return $mailBox.getAvatars(id);
    });

    if (typeof res.viewers.viewers !== 'undefined') {
      let timgurl;
      timgurl = res.viewers.viewers;
      let imgurl;
      imgurl = timgurl.substr(0, timgurl.length - 1);
      let images = imgurl.split(',');
      let i = 0;
      let imgarrays = [];
      images.forEach(item => {
        imgarrays[i++] = item.split('/')[0];
      });
      await this.setState(
        {
          profileImages: imgarrays
        },
        function() {}.bind(this)
      );
    }
  }

  render() {
    const isBadge = this.props.Badge ? true : false;
    const isImportant = this.props.Important ? true : false;
    const isEncrypted = this.props.Encrypted ? true : false;
    const isCCEmail = this.props.CCEmail ? true : false;
    const isMultipleAttachment = this.props.MultipleAttachment ? true : false;
    const lock = <FontAwesomeIcon icon={faLock} />;
    const data = this.props.data;
    let remaningImages = 0;
    if (this.state.profileImages && this.state.profileImages.length > 3) {
      remaningImages = this.state.profileImages.length - 3;
    }
    return (
      <div>
        <Wrapper>
          <Row>
            <Col md="9">
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
                  <span>
                    <Moment format="DD MMM yyyy">{data.sentDate}</Moment>
                  </span>
                </div>
                <div>
                  {isImportant ? (
                    <span className="imp tag">important</span>
                  ) : (
                    ''
                  )}
                  {isCCEmail ? (
                    <span className="cc tag">
                      CC:<span className="email">{data.ccRecipients}</span>
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
                <div className="subject_container_simple">
                  <span className="subject subject_simple">{data.subject}</span>
                </div>
                {isMultipleAttachment ? (
                  <div className="attachment_holder">
                    <img className="" src={icoAttchment} />{' '}
                    <span className="attached_files">
                      Attached Files ({this.state.attachmentCount})
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Col>
            <Col md="3">
              <div class="avatars simple_card_avatars">
                {this.state.profileImages.map((image, idx) =>
                  idx < 3 ? (
                    <span class="avatar">
                      <img
                        id={
                          `avatar-${this.props.Id.substr(0, 150)}` +
                          `${image.substr(0, 9)}`
                        }
                        width={55}
                        className="email-viewed-img"
                        src={`https://slsprofilepic.s3.amazonaws.com/${image}`}
                        alt=""
                      />
                    </span>
                  ) : (
                    ''
                  )
                )}
                {remaningImages > 0 ? (
                  <span class="avatar">
                    <div class="text_circle">+{remaningImages}</div>
                  </span>
                ) : (
                  ''
                )}
              </div>
            </Col>
          </Row>
        </Wrapper>
      </div>
    );
  }
}
export default SimpleCard;
