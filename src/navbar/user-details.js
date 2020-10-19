import React, {useContext} from 'react';
import {AppContext} from '../app';
import Button from '@material-ui/core/Button';


export default () => {

  const {userAuth, userProfile} = useContext(AppContext);

  if (!userAuth || !userProfile){
    return (<Button color="inherit">Sign In</Button>)
  }
  return (
  <Button color="inherit">{userProfile.firstName}</Button>
  )
}