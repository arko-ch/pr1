import React from 'react';
import './assignemailtabs.scss';
import icoclose from './../../../assets/images/ico-close.svg';

const ChildTab = props => {
  return (
    <div className={props.isActive ? 'content active' : 'content'}>
      <div className="content">
        <img className="child_icon" src={props.icon} />
      </div>
      <div className="content">
        <span className={props.isActive ? 'tab_text_active' : 'tab_text'}>
          {props.text}
        </span>
      </div>
      {props.isActive ? (
        <div className="content">
          <img className="child_icon" src={icoclose} />
        </div>
      ) : (
        ''
      )}
      {props.isShowsparator ? (
        <div className="content">
          <span className="sparator"></span>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ChildTab;
