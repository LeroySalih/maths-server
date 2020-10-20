import React from 'react'
import styled from 'styled-components';

import SignIn from '../sign-in';
import LaunchSession from '../launch-session';
import StreakLogo from '../streak-logo';



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




export default () => {
  return (
    <Page>
        <Container>
          <Panel>
            
              <StreakLogo/>
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