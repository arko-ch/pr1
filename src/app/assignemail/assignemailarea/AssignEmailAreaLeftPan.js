import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import {
  TabPanel,
  StyledTabs,
  a11yProps,
  StyledTab,
  useStyles
} from './TabStyles';

import Loader from 'react-loaders';
import $mailBox from '../services/MailBox';
import icosearch from '../../../assets/images/search-email.svg';
import icoadjust from '../../../assets/images/adjust.svg';
import iconewemail from '../../../assets/images/newemail.svg';
import EmailCard from './AssignEmailCard';
import profileOne from './../../../assets/images/profileOne.svg';

//import EmailTabs from "./EmailTabs"

export default function AssignEmailLeftPan() {
  const [value, setValue] = React.useState(0);
  // use this to show loading state
  const [loading, setLoading] = React.useState(false);
  const [fetchedMessages, setFetchedMessages] = React.useState([]);
  const [nextMessages, setNextMessages] = React.useState([]);
  const [cardItems, setCardItems] = React.useState([]);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFetchMessages = async () => {
    setLoading(true);

    try {
      const res = await $mailBox.getFolderMessages(
        'AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNAAuAAADqBCIigcO20iQywAELs4eVAEAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAA'
      );
      if (res.data.messages.value) {
        // Group conversation
        let conversations = {};
        res.data.messages.value.forEach(item => {
          if (conversations[item.conversationId]) {
            conversations[item.conversationId].push(item);
            window.itemid = item.id;
          } else {
            conversations[item.conversationId] = [item];
          }
        });
        // Create Data Object
        let emailCardItems = [];
        Object.keys(conversations).map((key, idx) => {
          let conversation = conversations[key];
          if (conversation.length > 1) {
            // Sort get the latest conversation item
            let sorted = []
              .concat(conversation)
              .sort((a, b) => (a.sentDateTime > b.sentDateTime ? 1 : -1));
            conversation = [];
            conversation[0] = sorted[0];
          }

          conversation.forEach(item => {
            let data = {
              username: item.sender.emailAddress.name,
              userprofile: profileOne,
              isBadge: false,
              subject: item.subject,
              sentDate: item.sentDateTime,
              ccRecipients:
                item.ccRecipients && item.ccRecipients.length > 0
                  ? item.ccRecipients[0].emailAddress.address
                  : ''
            };

            let isCCEmail = item.ccRecipients && item.ccRecipients.length;
            let id = item.id;
            let hasAttachments = item.hasAttachments;
            let importance = false;
            if (item.importance === 'high') importance = true;

            emailCardItems.push(
              <EmailCard
                data={data}
                CCEmail={isCCEmail}
                Id={id}
                MultipleAttachment={hasAttachments}
                Important={importance}
              />
            );
          });
        });
        setCardItems(emailCardItems);
        setFetchedMessages(res.data.messages.value);
        setNextMessages(res.data.messages['@odata.nextLink']);
      }
      setLoading(false);
    } catch (err) {
      console.error('error >', err);
    }
  };

  useEffect(() => {
    handleFetchMessages();
  }, []);

  // const data = [
  //   {
  //     username: 'Alex Tsibulski',
  //     userprofile: profileOne,
  //     isBadge: false,
  //     subject:
  //       'Dignissim euismod augue arcu nec vestibulum sollicitudin consectetur nisi egestas massa ut!'
  //   },
  //   {
  //     username: 'Jene Doe',
  //     userprofile: profileTwo,
  //     isBadge: true,
  //     subject: 'And if you’d like a closer look at the work I showed.',
  //     attachments: [
  //       {
  //         type: 'pdf',
  //         url: '',
  //         name: 'invoice3322.pdf'
  //       }
  //     ]
  //   },
  //   {
  //     username: 'Olivia Flores',
  //     userprofile: profileThree,
  //     isBadge: false,
  //     subject:
  //       'And here are the slides I’ll walk through. Please take a look beforehand!',
  //     attachments: [
  //       {
  //         type: 'pdf',
  //         url: '',
  //         name: 'invoice3322.pdf'
  //       },
  //       {
  //         type: 'img',
  //         url: '',
  //         name: 'Screenshot approvel of document'
  //       }
  //     ]
  //   }
  // ];
  return (
    <div>
      <div className="tab_container">
        <Row>
          <Col>
            {/* <EmailTabs value={value} setValue={setValue}/> */}
            <div className={classes.root}>
              <div className={classes.emailtab}>
                <StyledTabs
                  value={value}
                  onChange={handleChange}
                  aria-label="styled tabs"
                >
                  <StyledTab
                    label="Inbox"
                    className={classes.width_left}
                    {...a11yProps(0)}
                  />
                  <StyledTab
                    label="All (21)"
                    className={classes.width_left}
                    {...a11yProps(1)}
                  />
                  <StyledTab
                    label="New (6)"
                    className={classes.width_left}
                    {...a11yProps(2)}
                  />
                </StyledTabs>
              </div>
            </div>
          </Col>
          <Col>
            <div className="email_button_holder">
              <img src={icosearch} />
              <img src={icoadjust} />
              <button className="new_email_btn">
                <span>
                  <img src={iconewemail} /> New Email
                </span>
              </button>
            </div>
          </Col>
        </Row>
      </div>

      <Row>
        <Col>
          <TabPanel value={value} index={0}>
            {loading ? (
              <div>
                <Loader className="mt-3" type="ball-pulse" />{' '}
              </div>
            ) : (
              cardItems
            )}
            {/* <EmailCard data={data[0]} MultipleAttachment />
            <EmailCard data={data[1]} MultipleAttachment />
            <EmailCard data={data[2]} MultipleAttachment />
            <EmailCard
              isExpanded={true}
              Badge
              MultipleAttachment
              Primary
              data={data[0]}
            />
            <EmailCard
              isExpanded={true}
              Important
              Encrypted
              CCEmail
              data={data[1]}
              MultipleComments
            />
            <EmailCard
              isExpanded={true}
              Encrypted
              CCEmail
              data={data[2]}
              MultipleComments
            /> */}
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Col>
      </Row>
    </div>
  );
}
