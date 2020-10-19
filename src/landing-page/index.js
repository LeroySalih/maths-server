import React from 'react'
import styled from 'styled-components';

import {Link} from 'react-router-dom';
import ConnectTest from '../connect-test'
import AuthTest from '../auth-test';
import SignIn from '../sign-in';
import LaunchSession from '../launch-session';

import StreakImg from './7.svg';

const Page = styled.div`
  display: flex;
  height: calc(100vh - 35px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Container = styled.div`
  width: 500px;
  flex-direction: column;
  margin: auto;
  padding: 20px;
  height: 100% ;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Panel = styled.div`
  width: 400px;
  background-color: silver;
  display: flex;
  flex-direction: column;
  

`

const SignInPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

`

const StreakLogoContainer = styled.div`
  background-color: yellow;
  width: 60px;
  height: 60px;
  padding: 2px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 5px white;

`

const StreakLogo = styled.img`
  width: 50px
`

export default () => {
  return (
    <Page>
        <Container>
          <Panel>
            
              <StreakLogoContainer>
                <StreakLogo src={StreakImg} alt="Streak Logo"/>
              </StreakLogoContainer>
              <div>
                Welcome to Streaks
              </div>

              <SignIn />
              
              <LaunchSession/>
            
          
          </Panel>
        
        </Container>
    </Page>
  );
}