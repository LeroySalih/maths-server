import React from 'react'

import ConnectTest from '../connect-test'
import AuthTest from '../auth-test';
import SignIn from '../sign-in';


export default () => {
  return (
    <div>
        <div>My Server</div>
        <div>Hosted.</div>
        <ConnectTest></ConnectTest>
        <AuthTest></AuthTest>
        <SignIn></SignIn>
    </div>
  );
}