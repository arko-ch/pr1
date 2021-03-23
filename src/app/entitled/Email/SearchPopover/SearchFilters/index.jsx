import React, { useState } from 'react';
import {
  EmailFilterButtons,
  EmailFilterButtonsContainer,
  EmailSearchPopover,
  PopoverButton
} from '../../StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../../../app/icons/Icon';

const SearchFilters = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const toggle = () => {
    setOpenFilter(prevState => !prevState);
  };
  return (
    <EmailFilterButtonsContainer>
      <EmailFilterButtons>
        <FontAwesomeIcon icon={Icons.faPaperclip} className="mr-1" /> Has
        attachments
      </EmailFilterButtons>
      <EmailFilterButtons>
        <FontAwesomeIcon icon={Icons.fasCalendar} className="mr-1" /> Calendar
        items
      </EmailFilterButtons>
      <EmailFilterButtons onClick={() => toggle()}>
        <FontAwesomeIcon icon={Icons.faListOl} className="mr-1" />
        Past Year
        <FontAwesomeIcon icon={Icons.fasSortDown} className="ml-1" />
        {openFilter && (
          <EmailSearchPopover>
            <PopoverButton>Past Year</PopoverButton>
            <PopoverButton>Past Month</PopoverButton>
            <PopoverButton>Past Week</PopoverButton>
          </EmailSearchPopover>
        )}
      </EmailFilterButtons>
    </EmailFilterButtonsContainer>
  );
};

export default SearchFilters;
