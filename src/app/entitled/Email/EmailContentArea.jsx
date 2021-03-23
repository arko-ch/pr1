import React from 'react';
import { Collapse } from 'reactstrap';

const EmailContentArea = ({ open }) => {
  return (
    <Collapse isOpen={open}>
      <div className="email-content-divider" />
      <div className="email-break" />
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
      richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
      anderson cred nesciunt sapiente ea proident.
    </Collapse>
  );
};

export default EmailContentArea;
