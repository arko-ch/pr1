import React, { useEffect, useState } from 'react';
import { Container } from './StyledComponents';
import { EmailMessageShort, AssignTag } from './EmailStyledComponents';
import { crud } from '../../services/crud';

const $conversation = crud('conversations');
//const conversationId


const EmailMessage = ({ message , conversationId}) => {
  const [searchResults, setSearchResults] = useState('');  
  const RefNoBadge = async (conversationId) => {
  let res = await $conversation.find({
    'or:conversationId': conversationId,
    _project: [
      'context',    
    ],
    _limit: 10
  });
  
  if (res && res.data[0]) {   
    setSearchResults(res.data[0].context.referenceNo) 
  }
    
  }
  
  useEffect(() => {
    RefNoBadge(conversationId);
  }, []);
  
  return (
    <Container>   
      <AssignTag className="mr-1">{searchResults}</AssignTag>
      <EmailMessageShort dangerouslySetInnerHTML={{ __html: message }} />
    </Container>
  );
};
export default EmailMessage;
