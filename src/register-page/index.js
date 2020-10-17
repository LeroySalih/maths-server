import React, {useState, useContext} from 'react'
import {AppContext} from '../app'

import ConnectTest from '../connect-test'
import AuthTest from '../auth-test';
import SignIn from '../sign-in';
import FirebaseContext from '../firebase';


export default () => {

  const firebase = useContext(FirebaseContext)
  const {userAuth, userProfile} = useContext(AppContext);
  const [registerProfile, setRegsiterProfile] = useState(userProfile || {});

  const handleChange = (name, value) => {

    setRegsiterProfile((prev) => {
      return {...prev, [name]:value}
    });

  }

  const handleRegsiter = () => {
    firebase.userProfile(userAuth.uid).update(registerProfile)
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

        <button onClick={handleRegsiter}>Register</button>
        
    </div>
  );
}