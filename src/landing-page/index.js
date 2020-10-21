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
  background-image: url('./streak-logo.png');
`

const Panel = styled.div`
  
  width: 700px;
  background-color: silver;
  display: grid;
  grid-template-columns: 300px 300px;
  grid-template-areas: "title title" "text signin"; 
  flex-direction: column;
  position: relative;
  background-color: white;
  border: silver 1px solid;
  border-radius: 20px;

`
const BackgroundImage = styled.div`
  background-image: url('/streak-logo.svg');

  position: absolute;
  top: 0px;
  right: -100px;
  width: 100vh;
  height: 200vh;
  filter: grayscale(100%);
  opacity: 10%;
  z-index: -1;
`
const StreakLogoPositioned  = styled.div`
  
  grid-area: title;
  position: absolute;
  left: calc(350px - 33px);
  top:-50px;
`

const PanelTitle = styled.div`
  font-family: 'Open Sans';
  font-size: 2rem;
  grid-area: text;
  padding: 20px;
`

const SignInPanel = styled.div`
  grid-area: signin;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Title = styled.div`
  font-size: 1.8rem;
`

const Text = styled.div`
  font-size: 1rem;
  margin-top: 15px;
`




export default () => {
  return (
    <Page>
        <Container>
          <BackgroundImage/>
          <Panel>
              <StreakLogoPositioned>
                <StreakLogo style={{boxShadow: "0px 0px 20px #00000050"}}/>
              </StreakLogoPositioned>
              
              <PanelTitle>
                <Title>Welcome to Streaks</Title>
                <Text>
                  Answer questions correctly to build a streak.  The more you answer the higher the streak.  But don't break your streak, or you'll slide to 0.
                </Text>
                <LaunchSession/>
              </PanelTitle>

              <SignInPanel>
                <SignIn/>
              </SignInPanel>
              
            
          
          </Panel>
          
        </Container>
    </Page>
  );
}