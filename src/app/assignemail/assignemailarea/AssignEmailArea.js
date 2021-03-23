import React from 'react';
import './assignemailarea.scss';
import LeftPan from './AssignEmailAreaLeftPan';
import RightPan from './AssignEmailAreaRightPan';

function AssignEmailArea() {
  return (
    <div className="email_holder">
      <div className="email_area_wrapper">
        <div className="email_container email_area_left">
          <LeftPan />
        </div>
        <div className="email_container email_area_line_sepretor"></div>
        <div className="email_container email_area_right">
          <RightPan />
        </div>
      </div>
    </div>
  );
}

export default AssignEmailArea;
