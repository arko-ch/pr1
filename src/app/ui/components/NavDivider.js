import React from 'react';

export default function Divider(props) {
  let borderStyle = '1px solid rgba(150,150,150,0.25)';
  if (props.horizontal) {
    return (
      <div className="nav-divider" style={{ borderLeft: borderStyle }}></div>
    );
  }
  return (
    <div className="nav-divider" style={{ borderBottom: borderStyle }}></div>
  );
}
