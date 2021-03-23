import React from 'react';
import { CalendarContainer, CalendarIconContainer } from '../StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../../app/icons';

const MessageCalendarLink = ({ children, onClick }) => {
  return (
    <CalendarContainer onClick={onClick}>
      <CalendarIconContainer>
        <FontAwesomeIcon icon={Icons.faCalendar} />
      </CalendarIconContainer>
      {children}
    </CalendarContainer>
  );
};

export default MessageCalendarLink;
