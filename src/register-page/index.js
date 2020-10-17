import React, {useState, useContext} from 'react'
import {AppContext} from '../app'

import ConnectTest from '../connect-test'
import AuthTest from '../auth-test';
import SignIn from '../sign-in';
import FirebaseContext from '../firebase';

import {useHistory} from 'react-router-dom';
import { useSnackbar } from 'notistack';

import Button from '@material-ui/core/Button'

export default () => {

  const firebase = useContext(FirebaseContext)
  const {userAuth, userProfile} = useContext(AppContext);
  const [registerProfile, setRegsiterProfile] = useState(userProfile || {});

  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();

  const handleChange = (name, value) => {

    setRegsiterProfile((prev) => {
      return {...prev, [name]:value}
    });

  }

  const handleRegister = () => {
    console.log()
    firebase.userProfile(userAuth.uid)
        .update(registerProfile)
        .then(() => {enqueueSnackbar('Profile Updated', { variant: 'success' });})
        .catch((error) => {enqueueSnackbar('There was an issue updating your profile.', { variant: 'error' });})
  }


  if (userAuth === null){
    history.push('/');
  }

  return (
    <div>
        Register Page
        <div>{userProfile && userProfile.firstName}</div>
        <div>{!userProfile && (<span>Please set your details</span>)}</div>
        <input name="firstName" 
              value={registerProfile.firstName || ""}
              onChange={(e) => handleChange(e.target.name, e.target.value)}/>

        <input name="familyName" 
              value={registerProfile.familyName || ""}
              onChange={(e) => handleChange(e.target.name, e.target.value)}/>  


        <input name="classCode" 
              value={registerProfile.classCode || ""}
              onChange={(e) => handleChange(e.target.name, e.target.value)}/>

        <div>{JSON.stringify(registerProfile)}</div>

        <Button onClick={handleRegister} color="primary" variant="contained">Register</Button>
        
    </div>
  );
}