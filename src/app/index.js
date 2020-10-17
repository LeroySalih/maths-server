import React, { useEffect, useState } from 'react';
import './App.css';
import FirebaseContext, {firebase} from '../firebase'

import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom' 

import AppContext from './app-context'
import LandingPage from '../landing-page'
import ErrorPage from '../error-page'
import RegisterPage from '../register-page'

function App() {
  console.log('Starting');
  
  const [userAuth, setUserAuth] = useState(null);
  const [userProfile, setUserProfile] = useState(null);


  var history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(authUser => {

      // No current user.
      if (authUser === null || authUser === undefined){
        setUserAuth(null);
        return;
      }

      setUserAuth(authUser);

      console.log("New User Detected", authUser)
      console.log("Getting User Profile for", authUser.uid)

      // listen to the user profile for this Auth User
      firebase.userProfile(authUser.uid).on('value', (snapshot) => {

        // No profile found, so register the user
        if (snapshot.val() == null) {
          setUserProfile(null);
    
          // redirect to register page
          history.push('/register')
        } else {

          // Upadate the AuthUser to make it available 
          // to the context.

          const userProfile = snapshot.val();
          userProfile['uid'] = authUser.uid;
          setUserProfile(userProfile);

        }
      })
      
    })
  }, [])
  return (
    <FirebaseContext.Provider value={firebase}>
      <AppContext.Provider value={{ userAuth, userProfile}}>
        
        
          <Switch>
            <Route path="/" exact component={LandingPage}/>
            <Route path="/register"  component={RegisterPage}/>

            <Route path="*" component={ErrorPage}/>
          </Switch>
        
      </AppContext.Provider>
    </FirebaseContext.Provider>
  );
}

export default App;
export {AppContext}
