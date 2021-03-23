import React, { useEffect, useState } from 'react';
import { TabContent, TabPane } from 'reactstrap';
import EmailItem from './EmailItem';
import EmailTabs from './EmailTabs';
import { emails } from './helpers';
import MessageList from './MessageListv2';
import $mail from '../services/Mail';
import { Collapse } from 'reactstrap';
import AssignTransaction from './EmailMessageBox/AssignTransaction';
import { crud } from '../services/crud';

const EmailContent = ({ tabs, activeTab, setActiveTab }) => {
  const $conv = crud('conversations');
  const [searchValue, setSearchValue] = useState('');

  const [openedMessages, setOpenedMessages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [convoId, setConvoId] = useState(null);
  const [newInfoData, setNewInfoData] = useState(null);
  const [property, setProperty] = useState(null);

  const handleOpenMessage = id => {
    if (!openedMessages.includes(id)) {
      let tempIds = [...openedMessages];
      tempIds = [...tempIds, id];
      setOpenedMessages(tempIds);
    }
  };

  const handleCloseMessage = id => {
    const tempValue = openedMessages.filter(x => x !== id);
    setOpenedMessages(tempValue);
  };

  const [messages, setMessages] = useState([]);
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [nextMessages, setNextMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchMessages = async () => {
    setLoading(true);

    try {
      const res = await $mail.getFolderMessages(
        'AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNAAuAAADqBCIigcO20iQywAELs4eVAEAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAA'
      );

      if (res.data.messages) {
        setFetchedMessages(res.data.messages.value);
        setNextMessages(res.data.messages['@odata.nextLink']);
      }
    } catch (err) {
      console.error('error >', err);
    }

    setLoading(false);
  };

  const handleSearchMessages = async () => {
    setLoading(true);

    try {
      const res = await $mail.getMessages(searchValue);

      if (res.data.messages) {
        setSearchResults(res.data.messages.value);
      }
    } catch (err) {
      console.error('error >', err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleFetchMessages();
  }, []);

  useEffect(() => {
    if (searchValue) {
      handleSearchMessages();
    } else {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages, searchValue]);

  useEffect(() => {
    if (Array.isArray(searchResults) && searchResults.length > 0) {
      setMessages(searchResults);
    }
  }, [searchResults]);

  const handleSelectedProperty = property => {
    // alert('handleselectproperty')
    //  console.log('handleSelectedProperty convoid',property,convoId)
    setProperty(property);
    // handlePropertyAssign(property)
  };
  const toggleDropdown = mailObject => {
    setIsDropdownOpen(!isDropdownOpen);
    setConvoId(mailObject.conversationId);
  };

  /*  useEffect(() => {
    if (property) {
      handlePropertyAssign();
    }
  }, [property]); */

  useEffect(() => {
    handleFetchTransactionData();
  }, []);

  const handlePropertyAssign = async property => {
    const tempInfo = newInfoData || {};
    const res = await $conv.save({
      _id: tempInfo._id,
      conversationId: convoId, //mailobject.conversationId,
      context: {
        propertyId: property._id,
        referenceNo: property.referenceNo,
        prevPropId: '',
        prevReferenceNo: ''
      }
    });
    if (res && res.data) {
      setNewInfoData(res.data);
    }
  };

  const handleFetchTransactionData = async () => {
    let res = await $conv.find({
      conversationId_eq: convoId
    });
    if (res && res.data) {
      setNewInfoData(res.data[0]);
    }
  };

  return (
    <TabContent activeTab={activeTab} className="email-tab-content-container">
      <EmailTabs
        emailTabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        messages={searchResults}
        handleOpenMessage={handleOpenMessage}
      />

      <TabPane tabId={1}>
        <Collapse isOpen={isDropdownOpen}>
          <AssignTransaction
            toggleDropdown={toggleDropdown}
            messages={openedMessages}
            convoId={convoId}
            handleSelectedProperty={handleSelectedProperty}
          />
        </Collapse>
        <MessageList
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          newInfoData={newInfoData}
          query={searchValue}
          messages={messages}
          next={nextMessages}
          loading={loading}
          openedMessages={openedMessages}
          handleOpenMessage={handleOpenMessage}
          handleCloseMessage={handleCloseMessage}
        />
      </TabPane>
      <TabPane tabId={2}>Unsorted emails!</TabPane>
    </TabContent>
  );
};

export default EmailContent;
