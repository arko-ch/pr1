import React, { Fragment } from 'react';
import cx from 'classnames';

export default function Page(props) {
  React.useEffect(
    () => {
      console.log('hello');
    },
    [],
    () => {
      console.log('bye');
    }
  );
  return <Fragment>{props.children}</Fragment>;
}
//placeholder for simplifile
/*  useEffect(() => {
    setState(props);
}, [props]) */
  //console.log('FilterBar',props.value) //,props.meta,state.value)