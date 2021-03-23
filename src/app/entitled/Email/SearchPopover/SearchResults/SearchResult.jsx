import React, { useEffect, useState } from 'react';
import { SearchResultsItems } from '../../StyledComponents';
import $mail from '../../../services/Mail';

const SearchResult = ({ id, handleOpenMessage, setOpenSearch }) => {
  const [message, setMessage] = useState({});

  const handleFetchMessage = async () => {
    const res = await $mail.getConvo(id);

    if (res.data.messages) {
      setMessage(res.data.messages.value[0]);
    }
  };

  useEffect(() => {
    handleFetchMessage();
  }, [id]);

  const handleOpen = () => {
    handleOpenMessage(message.id);
    setOpenSearch(false);
  };

  return (
    <SearchResultsItems onClick={() => handleOpen()}>
      {message &&
      message.subject &&
      message.subject.substr(0, 3).toLowerCase() === 're:'
        ? message.subject.substr(3, 30)
        : message.subject}
    </SearchResultsItems>
  );
};

export default SearchResult;
