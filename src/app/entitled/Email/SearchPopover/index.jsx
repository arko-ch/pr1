import React, { useRef, useEffect } from 'react';
import { SearchPopoverContainer } from '../StyledComponents';
import SearchInput from './SearchInput';
import SearchFilters from './SearchFilters';
import SearchResults from './SearchResults';
import SearchFooter from './SearchFooter';

const SearchPopover = ({
  setOpenSearch,
  setSearchValue,
  messages,
  handleOpenMessage
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <SearchPopoverContainer ref={wrapperRef}>
      <SearchInput setSearchValue={setSearchValue} />
      <SearchFilters />
      <SearchResults
        messages={messages}
        handleOpenMessage={handleOpenMessage}
        setOpenSearch={setOpenSearch}
      />
      <SearchFooter />
    </SearchPopoverContainer>
  );
};

export default SearchPopover;
