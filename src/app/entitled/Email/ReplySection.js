import React from 'react';
import { Button } from 'reactstrap';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';

const ReplySection = () => {
  return (
    <div className="reply-container">
      <h5>
        <FontAwesomeIcon icon={Icons.faReply} />
        Reply
      </h5>
      <h5>
        <FontAwesomeIcon icon={Icons.faReplyAll} />
        Reply All
      </h5>
      <h5>
        <FontAwesomeIcon icon={Icons.faTrash} />
        Junk
      </h5>
      <h5>
        <FontAwesomeIcon icon={Icons.faHome} />
        NJ-9588752
        <button>Change</button>
      </h5>
      <h5>
        <FontAwesomeIcon icon={Icons.faStar} />
        Highlight
      </h5>
      <h5>
        <FontAwesomeIcon icon={Icons.faFolderOpen} />
        File Manager<span>21</span>
      </h5>
      <div>Settlement</div>
    </div>
  );
};

export default ReplySection;
