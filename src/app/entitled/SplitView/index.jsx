import React, { useState, useEffect, Fragment } from 'react';
import SplitPane from 'react-split-pane';
import Email from '../Email';
import ConversationsApp from '../twilio/App';
// import '../../../app/1099form/1099form.scss';
import '../style/splitpane.scss';
import PropertyIndex from '../PropertyDetails/PropertyIndex';
//import modal from '../services/modal';
import mail from '../services/Mail';
import debounce from 'debounce';
import openSocket from 'socket.io-client';
import config from '../app/config/config';
import Header from '../Header';
import Footer from '../Footer';

import { TrackingProvider } from 'treacker';
import AssignedTab from '../Header/AssignedTab';

const INITIAL_PARAMS = {
  app_id: 'email'
};

const socket = openSocket(config.returnEnv());

const SplitView = () => {
  const [events, addEvent] = useState([]);
  const onTrackingEvent = event => {
    addEvent(state => [event, ...state]);
  };

  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    const $mail = mail;

    $mail.refreshAccessToken();
    //  $root.$on('mail-send', this.send);
    //  $root.$on('mail-folder', this.onFolderSelect);
    // $root.$on('mail-message', this.onMessageSelect);
    //  $root.$on('mail-message-reply', this.reply);
    //  $root.$on('mail-message-forward', this.forward);
    //console.log('clearing and mounting token ')
    localStorage.clear();
  });

  return (
    <div className="split-pane-container">
      <Header />
      <AssignedTab />
      {/* <TrackingProvider
        params={INITIAL_PARAMS}
        onTrackingEvent={onTrackingEvent}
        isReady={true}
      >  */}
      <ConversationsApp />
      <SplitPane split="vertical" minSize={50} defaultSize={100}>
        <div className="split-pane-left">
          {/*   <h3>Audit log</h3>
            <ul>
              {events.map(event => (
                <li key={event.timestamp}>
                  <div>eventName: {event.eventName}</div>
                  <div>params: {JSON.stringify(event.params)}</div>
                  <div>timestamp: {event.timestamp}</div>
                </li>
              ))}
            </ul> */}

          <Email />
        </div>

        <div className="split-pane-right">{/* <PropertyIndex /> */}</div>
      </SplitPane>
      {/* </TrackingProvider> */}
      <Footer />
    </div>
  );
};

export default SplitView;
