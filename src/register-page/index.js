import React, {useState, useContext} from 'react'
import {AppContext} from '../app'
import styled from 'styled-components'
import FirebaseContext from '../firebase';

import {useHistory} from 'react-router-dom';
import { useSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';

const RegisterPage = styled.div`
  display: flex;
  background-color: #fbfbfb;
  height: calc(100vh - 65px)
`

const Container = styled.div`
  width: 900px;
  margin: auto;
`

const Form = styled.div`
  border: solid 1px silver;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-content: middle;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 30px #00000050;
`

const Input = styled.input`
  margin: 10px;
  border: solid silver 1px;
  padding: 5px;
  border-radius: 5px
`

const InputField = styled.div``

export default () => {

  const firebase = useContext(FirebaseContext)
  const {userAuth, userProfile} = useContext(AppContext);
  const [registerProfile, setRegsiterProfile] = useState(userProfile || {});

  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();

  const handleChange = (name, value) => {

    setRegsiterProfile((prev) => {
      return {...prev, [name]:value}
    });

  }

  const handleExited = () => {
    history.push('/')
  }

  const handleRegister = () => {

    firebase.userProfile(userAuth.uid)
        .update(registerProfile)
        .then(() => {enqueueSnackbar('Profile Updated', { onExited: handleExited, variant: 'success',  autoHideDuration: 800, });})
        .catch((error) => {enqueueSnackbar('There was an issue updating your profile.', { variant: 'error' });})
  }

  


  
  if (userAuth === null){
    history.push('/');
  }

  return (
    <RegisterPage>
      <Container>
        <Form>
          <form>
          <h1 style={{paddingTop: "0px", marginTop: "0px"}}>Register Page</h1>
          <div>{!userProfile && (<span>Please set your details</span>)}</div>
          <InputField>
          <Input name="firstName" 
                id="firstName"
                label="First Name"
                variant="outlined"                
                value={registerProfile.firstName || ""}
                onChange={(e) => handleChange(e.target.name, e.target.value)}/>
          </InputField>
          <InputField>
          <Input name="familyName" 
                label="Family Name"
                variant="outlined"
                value={registerProfile.familyName || ""}
                onChange={(e) => handleChange(e.target.name, e.target.value)}/>  
          </InputField>
          <InputField>
          <Input name="classCode" 
                label="Class code"
                variant="outlined"
                value={registerProfile.classCode || ""}
                onChange={(e) => handleChange(e.target.name, e.target.value)}/>

          </InputField>

          <Button onClick={handleRegister} color="primary" variant="contained">Register</Button>
          </form>
        </Form>
        </Container>
    </RegisterPage>
  );
}