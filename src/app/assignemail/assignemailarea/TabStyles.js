import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  padding: {
    padding: theme.spacing(3)
  },
  emailtab: {
    backgroundColor: theme.palette.background.paper,
    bottom: 0,
    position: 'absolute'
  },
  emailRighttab: {
    backgroundColor: theme.palette.background.paper,
    //bottom:0,
    position: 'absolute'
  },
  width_left: {
    minWidth: 72
  },
  width_right: {
    minWidth: 120
  }
}));

export const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    height: '4px',
    backgroundColor: 'transparent',
    '& > span': {
      //maxWidth: 40,
      width: '65%',
      borderTopRightRadius: '60px',
      borderTopLeftRadius: '60px',
      backgroundColor: '#307df6'
    }
  }
})(props => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

export const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '16px',
    marginBottom: '10px',
    padding: '0px',
    //marginRight: theme.spacing(1),
    color: '#393939',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      '"Liberation Sans"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"'
    ].join(','),
    '&:hover': {
      color: '#393939',
      opacity: 1,
      padding: '0px'
    },
    '&$selected': {
      color: '#307df6',
      fontWeight: 600,
      padding: '0px'
    },
    '&:focus': {
      color: '#307df6',
      padding: '0px'
    }
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);

export function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
