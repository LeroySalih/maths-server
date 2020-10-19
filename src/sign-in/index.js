import React, {useContext} from 'react'
import FirebaseContext from '../firebase';
import MicrsoftSignIn from './microsoft-sign-in.png'
import {AppContext} from '../app';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const SignInButton = styled.img`
  width: 200px
`
export default () => {

  const firebase = useContext(FirebaseContext);
  const {userAuth,userProfile} = useContext(AppContext);

  const handleOnClick = () => {
    firebase.doMicrosoftSignIn();
  }

  const handleSignOut = () => {
    firebase.doSignOut()
      .then(() => {console.log(`userAuth signed out`)})
  }

  if (userAuth && userProfile) 
    return (<div>
              <h1>Welcome back, {userProfile.firstName}</h1>
              <h3>
                <Button onClick={handleSignOut}>Sign Out</Button>
              </h3>
            </div>)

  return (<SignInButton src={MicrsoftSignIn} onClick={handleOnClick} alt="Sign In with Microsoft account"/>)
}