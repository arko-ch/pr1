import React, { useEffect, useState,Fragment } from 'react';
import MessageItem from './MessasgeItem';
import { crud } from '../services/crud';
import events from '../services/events';
import { mail } from 'app/services/mail';
import Loader from 'react-loaders';
//import useInView from "react-cool-inview";
import InfiniteScroll from 'react-infinite-scroller';
import "../Email/Scroll.css"
const $mail = mail
const MessageListV2 =(props) => {
  const [messages, setMessages] = useState([]);
  const [attachmentsia, setAttachmentsia] = useState([]);
  const [selected, setSelected] = useState(null);
  const [folder, setFolder] = useState(props.folder || {});
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(null);
  const [convoItems, setConvoItems] = useState(null);
  
  
  

  const groupConvo = () => {
    let convos = {};
    props.messages.forEach(item => {
      if (convos[item.conversationId]) {
        convos[item.conversationId].push(item);
        window.itemid = item.id;
      } else {
        convos[item.conversationId] = [item];
      }
      //window.itemid=item.id
     // console.log('items in convo group ->>', item )
    });
    return convos;
  }

  const onClick=(message) => {
    setSelected(message.id)
    //this.$root.$emit('mail-message', message);
  }

  let convoItemsList = groupConvo();
   // console.log('convoItems',convoItems)
    let messageItems = [];
   // console.log('this props messagelist',this.props.messages)
    Object.keys(convoItemsList).map((key, idx) => {
      //console.log('push keys',convoItems)
      messageItems.push(
        
        <MessageItem
          groupedconvo={convoItemsList}
          isDropdownOpen={props.isDropdownOpen}
          toggleDropdown={props.toggleDropdown}
          newInfoData={props.newInfoData}
          convoId={key}
          idx={idx}
          key={idx}
          folder={folder}
          openedMessages={props.openedMessages}
          handleOpenMessage={props.handleOpenMessage}
          handleCloseMessage={props.handleCloseMessage}
        />

      );
    });
   /*  if (messageItems.length <= 10) {
      loadMore();
    }
 */
  

  return (
    <div>
      <Fragment>
        <ul className="list-group w-100">
          {/*  <li className="list-group-item d-flex justify-content-between align-items-center">
            {' '}
            Messages
            <Button
              color="link"
              className="p-0"
              id="writenewmail"
              onClick={this.props.writeMail}
            ></Button>
            <UncontrolledTooltip placement="right" target="writenewmail">
              Write New Mail
            </UncontrolledTooltip>
          </li> */}
          {props.loading ? (
            <div>
              {/* <div className='d-flex flex-column align-items-center justify-content-center p-5'> */}{' '}
              <Loader className="mt-3" type="ball-pulse" /> Loading... V2{' '}
            </div>
          ) : (
            <div className="pane">
            <div>
            <InfiniteScroll
            pageStart={0}
            //loadMore={loadFunc}
            hasMore={true || false}
           /*  loader={<div className="loader" key={0}>Loading ...</div>} */
            useWindow={false}
        >
           
           {messageItems}
         
         
          </InfiniteScroll>
          </div>
</div>
          
          )}
         {/*  {props.next && props.next.length > 0 && (
            <button
              className="list-group-item"
              onClick={() => {
                loadMore();
              }}
            >
              More...
            </button>
          )}
          <button
            className="list-group-item"
            onClick={() => {
              refresh();
            }}
          >
            Refresh
          </button> */}
        </ul>

      </Fragment>
    </div>
  )
}

export default MessageListV2;