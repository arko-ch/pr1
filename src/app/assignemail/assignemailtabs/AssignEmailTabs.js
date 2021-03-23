import React from 'react';
import './assignemailtabs.scss';
import iconsq from './../../../assets/images/iconsq.svg';
import icohome from './../../../assets/images/ico-home.svg';
import icobolt from './../../../assets/images/ico-bolt.svg';
import icoplus from './../../../assets/images/plus.svg';
import ChildTab from './ChildTab';

function AssignEmailTabs() {
  return (
    <div className="tab_holder">
      <div className="vertical-center">
        <div className="content">
          <img className="active icosq" src={iconsq} />
          <ChildTab
            icon={icohome}
            isActive={true}
            text={'St. Utica, Pennsylvania 578673517 W. Gray'}
          ></ChildTab>
          <ChildTab
            icon={icobolt}
            isActive={false}
            text={'8502 Preston Rd. Inglewood'}
            isShowsparator={true}
          ></ChildTab>
          <ChildTab
            icon={icobolt}
            isActive={false}
            text={'Dr. San Jose, South Dakota 83475'}
          ></ChildTab>
          <img className="icops" src={icoplus} />
        </div>
      </div>
    </div>
  );
}

export default AssignEmailTabs;
