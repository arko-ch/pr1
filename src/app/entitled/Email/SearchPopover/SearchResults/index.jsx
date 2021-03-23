import React, { useEffect, useState } from 'react';
import { SearchResultsContainer } from '../../StyledComponents';
import SearchResult from './SearchResult';

const SearchResults = ({ messages, handleOpenMessage, setOpenSearch }) => {
  const [itemIds, setItemIds] = useState([]);

  const handleConvo = () => {
    let convos = {};
    messages.forEach(item => {
      if (convos[item.conversationId]) {
        convos[item.conversationId].push(item);
        window.itemid = item.id;
      } else {
        convos[item.conversationId] = [item];
      }
    });
    return convos;
  };

  useEffect(() => {
    const convoItems = handleConvo();
    let tempIds = [];
    Object.keys(convoItems).map(item => {
      tempIds = [...tempIds, item];
    });

    setItemIds(tempIds);
  }, [messages]);

  return (
    <SearchResultsContainer>
      {itemIds.map(id => {
        return (
          <SearchResult
            id={id}
            handleOpenMessage={handleOpenMessage}
            setOpenSearch={setOpenSearch}
          />
        );
      })}
    </SearchResultsContainer>
  );
};

export default SearchResults;
