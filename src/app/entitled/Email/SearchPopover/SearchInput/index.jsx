//import React from 'react';
import React, { useRef, useEffect } from 'react';
import {
  SearchInputStyled,
  EmailCloseSearchButtonContainer
} from '../../StyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../../../app/icons/Icon';
import debounce from 'debounce';

const SearchInput = ({ setSearchValue }) => {
  const _search = debounce(keywords => {
    // this.setState({ query: keywords });
    setSearchValue(keywords);
  }, 2000);

  const onSearch = evt => {
    _search(evt.target.value);
  };

  return (
    <div className="position-relative">
      <SearchInputStyled onChange={e => onSearch(e)} />
      <EmailCloseSearchButtonContainer>
        {/*   <Input type="text" onChange={e => onSearch(e)} />
        <FontAwesomeIcon icon={Icons.faTimes} /> */}
      </EmailCloseSearchButtonContainer>
    </div>
  );
};

export default SearchInput;
