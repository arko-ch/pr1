import React, { Fragment } from 'react';

const Entry = props => {
  console.log('props >>', props);

  let { text, author, date } = props.entry;
  date = new Date(date).toString();
  return (
    <Fragment>
      <li>
        {text} &nbsp; by <em> {author.name} </em> on {date}
      </li>
    </Fragment>
  );
};

const Journal = props => {
  let entries = (props.journal || []).map((entry, idx) => {
    return <Entry key={`journal-${idx}`} entry={entry} />;
  });

  return (
    <Fragment>
      <ul> {entries} </ul>
    </Fragment>
  );
};
//strapiV3
export default Journal;
//placeholder for simplifile
/*  useEffect(() => {
    setState(props);
}, [props]) */
  //console.log('FilterBar',props.value) //,props.meta,state.value)