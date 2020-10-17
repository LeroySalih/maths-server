import React, {useContext} from 'react'
import FirebaseContext from '../firebase';

export default () => {

  const firebase = useContext(FirebaseContext);

  const handleOnClick = () => {
    firebase.doMicrosoftSignIn();
  }
  return (<button onClick={handleOnClick}>SignIn</button>)
}