import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Collapse } from 'reactstrap';
import {
  EmailMessageBoxContainer,
  EmailMessageContainer,
  MessageMoneyValue,
  UploadContainer
} from '../StyledComponents';
import { crud } from '../../../../app/services/crud';
import modal from '../../../../app/services/modal';
import PropertySelect from './PropertySelect';
import {
  IconContainer,
  EmailMessage,
  IconPopoverContainer,
  IconPopoverButtons
} from '../EmailStyledComponents';
import Avatar from './Avatar';
import Sender from './Sender';
import CarbonCopy from './CarbonCopy';
import Footer from './Footer';
import MessageCalendarLink from './MessageCalendarLink';
import UploadImage from './UploadImage';
import UploadedInvoice from './UploadedInvoice';
import Highlighter from 'react-highlight-words';
//import EmailInput from '../EmailInput';

import CalendarModal from './CalendarModal';
import styled from 'styled-components';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';
const EmailInput = React.lazy(() => import('../EmailInput'))
const HighlighterColor = styled.span`
  color: #28a745;
  margin-left: 5px;
  margin-right: 5px;
`;

const HighlightstyleObj = {
  color: '#00bf73',
  'background-color': 'rgba(46,240,119,0.1)'
};

const EmailMessageBox = ({
  isHighlighted,
  hasUploaded,
  message,
  children,
  mailobject,
  toggleShowComment,
  commentCount,
  idx,
  setAddNewComment,
  isOpen,
  handleReply,
  //activeReply,
  //activeReplyAll,
  handleReplyAll,
  toggleDropdown,
  isDropdownOpen,
  newInfoData
}) => {
  const $conv = crud('conversations');
  const [openCalender, setOpenCalendar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [property, setProperty] = useState(null);
  const [activeCollapse, setActiveCollapse] =useState('')
  const [activeReplyAll, setActiveReplyAll] =useState(false)

  const [searchResults, setSearchResults] = useState('');
    
  const RefNoBadge = async (conversationId) => {
  let res = await $conv.find({
    'or:conversationId': mailobject.conversationId,
    _project: [
      'context',    
    ],
    _limit: 10
  });
  
  if (res && res.data[0]) {   
    setSearchResults(res.data[0].context.referenceNo) 
  }
    
  }
  
  useEffect(() => {
    RefNoBadge(mailobject.conversationId);
  }, []);
  

  //console.log('info >', info);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleClose = () => {
    setOpenCalendar(false);
  };


  const handleOpen = () => {
    setOpenCalendar(true);
  };

  let str =
    'Yes our closing is still on, I think $5000 for the repairs is fine. Please call me. ';
  let searchWordsArrays_numeric = str.match(/\d+/g);
  let searchWordsArrays_datemmddyy = str.match(
    /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/g
  );
  let searcWordsArrays;

  if (searchWordsArrays_datemmddyy !== null) {
    searcWordsArrays = [
      ...searchWordsArrays_numeric,
      ...searchWordsArrays_datemmddyy
    ];
  } else {
    searcWordsArrays = searchWordsArrays_numeric;
  }

  const selectPropertyTransaction = async e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    modal.show({
      title: 'Assign Transaction',
      content: PropertySelect,
      actions: [
        {
          title: 'Ok',
          function: setProperty
        }
      ]
    });
  };

 

  useEffect(() => {
    if (property) {
      handleAssignProperty();
    }
  }, [property]);

  useEffect(() => {
    if (isOpen) {
      handleFetchConversationInfo();
    }
  }, [isOpen]);

 /*  useEffect(() => {
    console.log('props on mount',mailobject.id)
     
   }, []); */
  
/* 
  useEffect(() => {
   console.log('emailmessaggebox',message)
  }, []); */

  const handleAssignProperty = async () => {
    const tempInfo = info || {};
    const res = await $conv.save({
      _id: tempInfo._id,
      conversationId: mailobject.conversationId,
      context: {
        propertyId: property._id,
        referenceNo: property.referenceNo,
        prevPropId: '',
        prevReferenceNo: ''
      }
    });

    if (res && res.data) {
      setInfo(res.data);
    }
  };

  const handleFetchConversationInfo = async () => {
    let res = await $conv.find({
      conversationId_eq: mailobject.conversationId
    });
    if (res && res.data) {
      setInfo(res.data[0]);
    }
  };
const handleExpandCollapse  = async(mailid) =>{   
  if (activeCollapse === mailid){
    setActiveCollapse('')
  }else{
    setActiveCollapse(mailid)
  }
  setActiveReplyAll(false)  
}

const handleExpandCollapseReplyAll  = async(mailid) =>{  
  if (activeCollapse === mailid){
    setActiveCollapse('')
  }else{
    setActiveCollapse(mailid)
  }  
    setActiveReplyAll(true) 
}

  return (
    <EmailMessageBoxContainer
      isOpen={isOpen}
      className={isHighlighted && 'email-highlighted'}
    >
      <Col xs={12} md={1}>
        <Avatar />
      </Col>
      <Col xs={12} md={8}>
        <Sender sender={mailobject.from.emailAddress.address} thismessageitem={mailobject} />
        <CarbonCopy sender={mailobject.from.emailAddress.address} />
      </Col>

      <Col xs={12} md={3} className="align-right">
        {/* <IconContainer onClick={() => handleReply(mailobject.conversationId)}> */}
        <IconContainer onClick={() => handleExpandCollapse(mailobject.id)}>
        <FontAwesomeIcon icon={Icons.faReply} />
        </IconContainer>
        <IconContainer
          onClick={() => handleExpandCollapseReplyAll(mailobject.id)}>
        
          <FontAwesomeIcon icon={Icons.faReplyAll} />
        </IconContainer>
        <IconContainer>
          <FontAwesomeIcon icon={Icons.faStar} />
        </IconContainer>
        <IconContainer
          onClick={() => setDropdownOpen(prevState => !prevState)}
          isOpen={dropdownOpen}
        >
          <FontAwesomeIcon icon={Icons.faEllipsisV} />
          {dropdownOpen && (
            <IconPopoverContainer ref={wrapperRef}>
              <IconPopoverButtons onClick={() => toggleDropdown(mailobject)}>
                <FontAwesomeIcon icon={Icons.faHome} className="mr-1" />
                {searchResults
                  ? `Reassign (${searchResults})`
                  : 'Assign'}
                {/* <IconPopoverButtons onClick={e => selectPropertyTransaction(e)}>
                {info && info.context && info.context.propertyId
                  ? `Reassign (${info.context.referenceNo})`
                  : 'Assign'} */}
              </IconPopoverButtons>
              <IconPopoverButtons>
                <FontAwesomeIcon icon={Icons.faTasks} className="mr-1" /> Add
                task
              </IconPopoverButtons>
              <IconPopoverButtons>
                <FontAwesomeIcon icon={Icons.faCheck} className="mr-1" />
                Resolve task
              </IconPopoverButtons>
              <IconPopoverButtons isDelete>
                <FontAwesomeIcon icon={Icons.faTrash} className="mr-1" /> Delete
              </IconPopoverButtons>
            </IconPopoverContainer>
          )}
        </IconContainer>
      </Col>

      <Col xs={12} md={1}></Col>
      <Col xs={12} md={11}>
        <EmailMessage idx={idx} dangerouslySetInnerHTML={{ __html: message }} />
       {/* <Collapse isOpen={activeReply || activeReplyAll}>  */}
        <Collapse isOpen={activeCollapse}>  
          <EmailInput
            props={mailobject}
           /*  toggle={activeReplyAll ? true : false} */
            toggle={activeReplyAll} // ? true : false}
          />
        </Collapse>
        {/* {hasUploaded && (
          <UploadContainer>
            <UploadedInvoice />
            <UploadImage />
          </UploadContainer>
        )} */}

        {children && <UploadContainer>{children}</UploadContainer>}
        <Footer
          data={mailobject}
          idx={idx}
          toggleShowComment={toggleShowComment}
          commentCount={commentCount}
          setAddNewComment={setAddNewComment}
        />
      </Col>

      {openCalender && (
        <CalendarModal
          open={openCalender}
          handleClose={handleClose}
          className="calendar-container"
        />
      )}
    </EmailMessageBoxContainer>
  );
};

export default EmailMessageBox;
