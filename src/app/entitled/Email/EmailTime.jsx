import React from 'react';
import timeArrowIcon from '../../../assets/architect/utils/images/icons/time-arrow-icon.png';
import arrowDownIcon from '../../../assets/architect/utils/images/icons/arrow-down-icon.png';
import arrowUpIcon from '../../../assets/architect/utils/images/icons/arrow-up-icon.png';

const EmailTime = ({ day, hour, open, setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="email-email-time">
      <img src={timeArrowIcon} alt="" /> {day} days , {hour} hours
      {!open && (
        <div
          className="email-arrow-down-icon email-btns"
          onClick={() => handleOpen()}
        >
          <img src={arrowDownIcon} alt="" />
        </div>
      )}
      {open && (
        <div
          className="email-arrow-up-icon email-btns "
          onClick={() => handleClose()}
        >
          <img src={arrowUpIcon} alt="" />
        </div>
      )}
    </div>
  );
};

export default EmailTime;
