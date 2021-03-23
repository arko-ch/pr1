import React from 'react';
import { Store as LayoutStore } from '../layout/store';

import ChatBox from '../chat/Chat';

export default function Panel(props) {
  const store = React.useContext(LayoutStore);
  const onClick = () => {
    store.dispatch(
      store.setState({
        'panel.expand': false
      })
    );
  };

  const style = { position: 'fixed' };

  return (
    <div style={style}>
      <button className="m-4 btn btn-primary" onClick={onClick}>
        Close
      </button>
      <ChatBox />
    </div>
  );
}
//placeholder for simplifile
/*  useEffect(() => {
    setState(props);
}, [props]) */
  //console.log('FilterBar',props.value) //,props.meta,state.value)