import React, { useState, useEffect, useContext } from 'react'
import {useParams} from 'react-router-dom';
import FirebaseContext from '../firebase';

export default () => {

  const {sessionId} = useParams();
  const firebase = useContext(FirebaseContext);
  const [session, setSession] = useState(null);

  useEffect(()=> {
    // Load All Users to display data.
    firebase.session(sessionId).on('value', snapshot => {
      setSession(snapshot.val());
    });
  }, [sessionId]);


  const updateUserData = () => {

  }
  return (
    <div>
        Teachers View for {sessionId}
        {session && Object.values(session).map((user) => (
          <div>
            <div>Name: {user.name}</div>
            <div>Current: {user.streak}</div>
            <div>High: {user.highstreak}</div>
          </div>
        ))}
    </div>
  )
}