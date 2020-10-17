import React from 'react'

import {Link} from 'react-router-dom';
import ConnectTest from '../connect-test'
import AuthTest from '../auth-test';
import SignIn from '../sign-in';


export default () => {
  return (
    <div>
        <div>My Server</div>
        <div>Hosted.</div>
        <Link to="/register">Register</Link>
        <ConnectTest></ConnectTest>
        <AuthTest></AuthTest>
        <SignIn></SignIn>
    </div>
  );
}