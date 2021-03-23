import React from 'react';
//import Tabs from '@material-ui/core/Tabs';
import { StyledTabs, a11yProps, StyledTab, useStyles } from './TabStyles';

export default function EmailTabs(props) {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div className={classes.emailtab}>
        <StyledTabs
          value={props.value}
          onChange={handleChange}
          aria-label="styled tabs"
        >
          <StyledTab label="Inbox" {...a11yProps(0)} />
          <StyledTab label="All (21)" {...a11yProps(1)} />
          <StyledTab label="New (6)" {...a11yProps(2)} />
        </StyledTabs>
      </div>
    </div>
  );
}
