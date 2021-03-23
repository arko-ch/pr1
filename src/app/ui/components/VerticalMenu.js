import React from 'react';
import cx from 'classnames';
import Menu from './Menu';

function sortOrder(a, b) {
  let p1 = a.order || 0;
  let p2 = b.order || 0;
  return p1 <= p2 ? 1 : -1;
}

export default React.memo(function(props) {
  let itemsAtStart = (props.items || []).filter((i, idx) => {
    i.idx = idx;
    return !i.slot || i.slot === 'start';
  }).sort(sortOrder);
  let itemsAtEnd = (props.items || []).filter((i, idx) => {
    i.idx = idx;
    return i.slot === 'end';
  }).sort(sortOrder);

  let contentClass = props.overrideClass;
  if (!contentClass) {
    contentClass = cx(['vert d-flex flex-column h-100 p-0', props.className]);
  }
  return (
    <nav className={contentClass}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      >
      <Menu {...props} items={itemsAtStart} className="flex-column" />
      <div className="flex-grow-1"></div>
      <Menu {...props} items={itemsAtEnd} className="flex-column" />
    </nav>
  );
});
/*  useEffect(() => {
    setState(props);
}, [props]) */
  //console.log('FilterBar',props.value) //,props.meta,state.value)