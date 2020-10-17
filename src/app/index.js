import React, { useEffect, useState } from 'react';
import './App.css';
import FirebaseContext, {firebase} from '../firebase'
import ConnectTest from '../connect-test'
import SignIn from '../sign-in';
import AuthTest from '../auth-test'
import AppContext from './app-context'

function App() {
  console.log('Starting');
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(authUser => {
      console.log("New User", authUser)
      setUser(authUser);
    })
  }, [])
  return (
    <FirebaseContext.Provider value={firebase}>
      <AppContext.Provider value={{test:'Hello World', user}}>
        <div>
        <div>My Server</div>
        <div>Hosted.</div>
        <ConnectTest></ConnectTest>
        <AuthTest></AuthTest>
        <SignIn></SignIn>
        </div>
      </AppContext.Provider>
    </FirebaseContext.Provider>
  );
}

export default App;
