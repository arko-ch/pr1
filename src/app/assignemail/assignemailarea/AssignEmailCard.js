import React from 'react';
import './assignemailarea.scss';
import ExpandedCard from './ExpandedCard';
import SimpleCard from './SimpleCard';

function AssignEmailCard(props) {
  const isExpanded = props.isExpanded;
  if (isExpanded) {
    return <ExpandedCard {...props} />;
  }
  return <SimpleCard {...props} />;
}

export default AssignEmailCard;
