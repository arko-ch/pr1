import React from 'react';
import cx from 'classnames';
import Menu from './Menu';

function sortOrder(a, b) {
  let p1 = a.order || 0;
  let p2 = b.order || 0;
  return p1 <= p2 ? 1 : -1;
}

export default React.memo(function(props) {
  let itemsAtStart = (props.items || [])
    .filter((i, idx) => {
      i.idx = idx;
      return !i.slot || i.slot === 'start';
    })
    .sort(sortOrder);
  let itemsAtEnd = (props.items || [])
    .filter((i, idx) => {
      i.idx = idx;
      return i.slot === 'end';
    })
    .sort(sortOrder);

  console.log('render menu');

  return (
    <nav className={cx(['d-flex flex-row w-100 p-0', props.className])}>
      <Menu {...props} items={itemsAtStart} horizontal={true} topLevel={true} />
      <div className="flex-grow-1"></div>
      <Menu
        {...props}
        items={itemsAtEnd}
        horizontal={true}
        topLevel={true}
        right={true}
      />
    </nav>
  );
});
