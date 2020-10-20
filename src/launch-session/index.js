import React, {useState, useContext} from 'react';
import {AppContext} from '../app';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  border: silver 1px solid;
`
export default () => {

  const [sessionId, setSessionId] = useState('');

  const {userAuth, userProfile} = useContext(AppContext);
  let history = useHistory()

  const handleChange = (e) => {
    setSessionId(e.target.value);
  }

  const handleClick = () => {
    history.push(`/session/${sessionId}`);
  }

  const checkButtonEnabled = () => {
    return sessionId.length >= 5
  }

  if (!userAuth || !userProfile)
    return (<div></div>)

  return (
    <div>
      <Input placeholder="Enter PIN" value={sessionId} onChange={handleChange}></Input>
      <Button 
        color="primary" 
        variant="contained" 
        onClick={handleClick}
        disabled={!checkButtonEnabled()}
        >Launch!</Button>
    </div>
  );
}