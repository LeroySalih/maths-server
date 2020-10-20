import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};


class Firebase {


  constructor() {    
    app.initializeApp(config)

    this.auth = app.auth;
    this.db = app.database();

    

  }

  

  doMicrosoftSignIn = () => {

    var provider = new this.auth.OAuthProvider('microsoft.com');
    provider.setCustomParameters({
      // Force re-consent.
      //prompt: 'consent',
      // Target specific email with login hint.
      //login_hint: 'user@firstadd.onmicrosoft.com'
    });

    provider.addScope('mail.read');
    provider.addScope('calendars.read');

    firebase.auth().signInWithPopup(provider)
      .then(function(result) {
    // User is signed in.
    // IdP data available in result.additionalUserInfo.profile.
    // OAuth access token can also be retrieved:
    // result.credential.accessToken
    // OAuth ID token can also be retrieved:
    // result.credential.idToken
  })
  .catch(function(error) {
    console.error(error)
    // Handle error.
  });

  }

  doSignOut = () => {
    return firebase.auth().signOut()
  }

  userProfiles = () => this.db.ref('user-profile')
  userProfile = (uid) => ( this.db.ref('user-profile').child(uid) )
  session = (sessionId) => this.db.ref('sessions').child(sessionId)
  messages = () => this.db.ref('messages');


}

const firebase = new Firebase()
export default firebase;