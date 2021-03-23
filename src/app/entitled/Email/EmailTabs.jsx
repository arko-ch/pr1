import React, { useState,useCallback } from 'react';
import { Nav, NavItem, NavLink, Col, Collapse } from 'reactstrap';
import classnames from 'classnames';
import {
  EmailTabIconContainer,
  EmailTabContainer,
  EmailGrayButton,
  EmailBlueButton,
  EmailSearch,
  EmailBadge
} from './StyledComponents';
import { EmailTabButtons } from './EmailStyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';
import SearchPopover from './SearchPopover';
import EmailInputWriteNew from './EmailInputWriteNew';

const renderFilterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 9.5C4.55228 9.5 5 9.94772 5 10.5V15.75C5 16.3023 4.55228 16.75 4 16.75C3.44772 16.75 3 16.3023 3 15.75V10.5C3 9.94772 3.44772 9.5 4 9.5Z"
        fill="#6D7082"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 1.25C4.55228 1.25 5 1.69772 5 2.25V7.5C5 8.05228 4.55228 8.5 4 8.5C3.44772 8.5 3 8.05228 3 7.5V2.25C3 1.69772 3.44772 1.25 4 1.25Z"
        fill="#6D7082"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 8C9.55228 8 10 8.44772 10 9V15.75C10 16.3023 9.55228 16.75 9 16.75C8.44772 16.75 8 16.3023 8 15.75V9C8 8.44772 8.44772 8 9 8Z"
        fill="#6D7082"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 1.25C9.55228 1.25 10 1.69772 10 2.25V6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6V2.25C8 1.69772 8.44772 1.25 9 1.25Z"
        fill="#6D7082"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 11C14.5523 11 15 11.4477 15 12V15.75C15 16.3023 14.5523 16.75 14 16.75C13.4477 16.75 13 16.3023 13 15.75V12C13 11.4477 13.4477 11 14 11Z"
        fill="#6D7082"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 1.25C14.5523 1.25 15 1.69772 15 2.25V9C15 9.55228 14.5523 10 14 10C13.4477 10 13 9.55228 13 9V2.25C13 1.69772 13.4477 1.25 14 1.25Z"
        fill="#6D7082"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.75 10.5C0.75 9.94772 1.19772 9.5 1.75 9.5H6.25C6.80228 9.5 7.25 9.94772 7.25 10.5C7.25 11.0523 6.80228 11.5 6.25 11.5H1.75C1.19772 11.5 0.75 11.0523 0.75 10.5Z"
        fill="#6D7082"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.75 6C5.75 5.44772 6.19772 5 6.75 5H11.25C11.8023 5 12.25 5.44772 12.25 6C12.25 6.55228 11.8023 7 11.25 7H6.75C6.19772 7 5.75 6.55228 5.75 6Z"
        fill="#6D7082"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.75 12C10.75 11.4477 11.1977 11 11.75 11H16.25C16.8023 11 17.25 11.4477 17.25 12C17.25 12.5523 16.8023 13 16.25 13H11.75C11.1977 13 10.75 12.5523 10.75 12Z"
        fill="#6D7082"
      />
    </svg>
  );
};

const EmailTabs = ({
  emailTabs,
  activeTab,
  setActiveTab,
  setSearchValue,
  messages,
  handleOpenMessage
}) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openNewMail, setOpenNewMail] = useState(false);
  //const [searchValue, setSearchValue] = useState('');


  // make wrapper function to give child
  const wrapperSetParentState = useCallback(val => {
    setOpenNewMail(val);
  }, [setOpenNewMail]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
const toggleWriteNew = () => setOpenNewMail(!openNewMail);
 const toggleWriteNewClose = () => setOpenNewMail(!openNewMail);


  return (
    <>
      <EmailTabContainer>
        <Col xs={12} md={6} className="p-0">
          <Nav tabs className="email-nav-tabs">
            {emailTabs.map(x => {
              return (
                <NavItem>
                  <NavLink
                    className={classnames(
                      { active: activeTab === x.value },
                      'email-tab-header'
                    )}
                    onClick={() => {
                      toggle(x.value);
                    }}
                  >
                    {x.label}
                    {x.badge && <EmailBadge>({x.badge})</EmailBadge>}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </Col>
        <Col xs={12} md={6} className="align-right pl-0 pr-0 pb-2">
          <EmailTabButtons className="ml-2" onClick={() => setOpenSearch(true)}>
            <FontAwesomeIcon icon={Icons.faSearch} />
          </EmailTabButtons>
          <EmailTabButtons className="ml-2">
            {renderFilterIcon()}
          </EmailTabButtons>
          <EmailBlueButton onClick={() => toggleWriteNew()} className="ml-2">
            <FontAwesomeIcon icon={Icons.faEdit} className="mr-1" /> New Email
          </EmailBlueButton>
        </Col>
        {openSearch && (
          <SearchPopover
            setOpenSearch={setOpenSearch}
            setSearchValue={setSearchValue}
            messages={messages}
            handleOpenMessage={handleOpenMessage}
          />
        )}
      </EmailTabContainer>
      <Collapse isOpen={openNewMail}>
      
        <div>
          <EmailInputWriteNew
        
         toggleWriteNewClose={toggleWriteNewClose}

          />
        </div>
      </Collapse>
    </>
  );
};

export default EmailTabs;
