import React, { useState, useRef, useEffect } from 'react';
import { Col, Row, Collapse } from 'reactstrap';
import moment from 'moment';
import {
  MessageBoxFooterContainer,
  PopoverContainer
} from '../StyledComponents';
import {
  SaveLink,
  ButtonLink,
  CommentSenderContainer
} from '../EmailStyledComponents';
import CommentInput from '../EmailComment/CommentInput';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';
import PopoverButtons from './PopoverButtons';
import EmailInput from '../EmailInput';
import { handleConvertDate } from '../helpers';
const RenderSortDownIcon = ({ className }) => {
  return (
    <div id="Popover1" className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
      >
        <path
          d="M1.2833 0H8.7208C9.38955 0 9.72393 0.809377 9.25205 1.28125L5.5333 5.00001C5.23955 5.29377 4.76455 5.29377 4.47393 5.00001L0.752053 1.28125C0.280178 0.809377 0.614553 0 1.2833 0Z"
          fill="#307DF6"
        />
      </svg>
    </div>
  );
};

const Footer = ({
  data,
  toggleShowComment,
  commentCount,
  idx,
  setAddNewComment
}) => {
  const [openPopper, setOpenPopper] = useState(false);
  const [activeReply, setActiveReply] = useState(false);
  //console.log('footer data',data)
  const popperToggle = () => {
    setOpenPopper(prevState => !prevState);
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenPopper(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <MessageBoxFooterContainer>
      <Col xs={12} md={8} className="p-0">
        <CommentSenderContainer>
          {commentCount > 0 && (
            <SaveLink onClick={() => toggleShowComment(idx)}>
              <FontAwesomeIcon
                icon={Icons.faComment}
                size="sm"
                className="email-btns mr-1"
              />
              Comments ({commentCount})
            </SaveLink>
          )}

          <ButtonLink onClick={() => setAddNewComment(true)}>
            <FontAwesomeIcon
              icon={Icons.faComment}
              size="sm"
              className="email-btns mr-1"
            />
            Add Comment
          </ButtonLink>
        </CommentSenderContainer>
      </Col>
      <Row>
        <Col>
          <Collapse isOpen={activeReply}>
            <EmailInput props={data} />
          </Collapse>
        </Col>
      </Row>
      <Col xs={12} md={4} className="align-right">
        <SaveLink onClick={() => popperToggle()} ref={wrapperRef}>
          Save
          {openPopper && (
            <PopoverContainer>
              <PopoverButtons />
            </PopoverContainer>
          )}
          {openPopper && (
            <span>
              <FontAwesomeIcon
                icon={Icons.faAngleUp}
                size="sm"
                className="email-btns ml-1"
              />
            </span>
          )}
          {!openPopper && (
            <span>
              <FontAwesomeIcon
                icon={Icons.faAngleDown}
                size="sm"
                className="email-btns ml-1"
              />
            </span>
          )}
        </SaveLink>
      </Col>
    </MessageBoxFooterContainer>
  );
};

export default Footer;
