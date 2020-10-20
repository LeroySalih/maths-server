import React from 'react';
import {useHistory} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import UserDetails from './user-details';
import MrSalihLogo from './mr-salih-logo.png';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBarLogo = styled.img`
  width: 40px;
  padding-left: 20px; 
`
export default () => {
  
  let history = useHistory()
  const classes = useStyles();
  const handleLogoClick = () => {
    history.push('/');
  }

  return (
  <AppBar position="static">
  <Toolbar>
    <IconButton 
      edge="start" 
      onClick={handleLogoClick}
      className={classes.menuButton} color="inherit" aria-label="menu">
      <NavBarLogo  src={MrSalihLogo}/>
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      Maths Server
    </Typography>
    <UserDetails/>
  </Toolbar>
</AppBar>
)
};

