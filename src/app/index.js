import React, { useEffect, useState } from 'react';
import './App.css';
import FirebaseContext, {firebase} from '../firebase'

import { Route, Switch, useHistory} from 'react-router-dom' 
import { SnackbarProvider } from 'notistack';

import AppContext from './app-context'
import LandingPage from '../landing-page'
import ErrorPage from '../error-page'
import RegisterPage from '../register-page'
import SessionPage from '../session-page';
import TeacherPage from '../teacher-page';

import Navbar from '../navbar';

function App() {
  console.log('Starting App');
  
  const [userAuth, setUserAuth] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  var history = useHistory();

  useEffect(() => {
    document.title = "Streaks";

    firebase.auth().onAuthStateChanged(authUser => {

      // No current user.
      if (authUser === null || authUser === undefined){
        setUserAuth(null);
        return;
      }

      setUserAuth(authUser);

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
          document.title = `Streaks - ${userProfile.firstName} ${userProfile.familyName}`
          setUserProfile(userProfile);

        }
      }); 
      
    }) // firebaseAuthChanged
    
    },[]);

  return (
    <SnackbarProvider maxSnack={3}>
      <FirebaseContext.Provider value={firebase}>
        <AppContext.Provider value={{ userAuth, userProfile}}>
          
            <Navbar/>
            <Switch>
              <Route path="/" exact component={LandingPage}/>
              <Route path="/register"  component={RegisterPage}/>
              <Route path="/session/:sessionId" component={SessionPage}/>
              <Route path="/teacher/:sessionId" component={TeacherPage}/>
              <Route path="*" component={ErrorPage}/>
            </Switch>
          
        </AppContext.Provider>
      </FirebaseContext.Provider>
    </SnackbarProvider>
  );
}

export default App;
export {AppContext}
