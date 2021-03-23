import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import icoMore from './../../../assets/images/icomore.svg';
import icoHome from './../../../assets/images/icogreyhome.svg';
import icoResolve from './../../../assets/images/icoresolve.svg';
import icoList from './../../../assets/images/icolist.svg';
import icoStar from './../../../assets/images/icostar.svg';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    //   anchorOrigin={{
    //     vertical: 'bottom',
    //     horizontal: 'center',
    //   }}
    //   transformOrigin={{
    //     vertical: 'top',
    //     horizontal: 'center',
    //   }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    marginRight: '5px',
    marginLeft: '5px',
    backgroundColor: 'transparent !important',
    '& .MuiListItemIcon-root': {
      minWidth: '38px !important'
    },
    '&:hover': {
      backgroundColor: '#f1f3f9 !important',
      borderRadius: '6px',
      marginRight: '5px',
      marginLeft: '5px',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#6d7082'
      }
    }
  }
}))(props => <MenuItem {...props} />);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [className, setClassName] = React.useState(null);

  const handleClick = event => {
    setClassName(
      event.currentTarget.parentElement.parentElement.parentElement.className
    );
    setAnchorEl(event.currentTarget);
    event.currentTarget.parentElement.parentElement.parentElement.style =
      'display:flex';
  };

  const handleClose = () => {
    anchorEl.parentElement.parentElement.parentElement.style = className;
    setAnchorEl(null);
    setClassName(null);
  };

  return (
    <div>
      <img src={icoMore} onClick={handleClick} />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <img src={icoStar} />
          </ListItemIcon>
          <ListItemText primary="Important" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <img src={icoHome} />
          </ListItemIcon>
          <ListItemText primary="Reassign" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <img src={icoList} />
          </ListItemIcon>
          <ListItemText primary="Add Task" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <img src={icoResolve} />
          </ListItemIcon>
          <ListItemText primary="Resolve Task" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
