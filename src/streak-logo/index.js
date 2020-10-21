import React from 'react';
import styled from 'styled-components';
import StreakImg from './7.svg';

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

export default (props) => {
  return (
  <StreakLogoContainer {...props}>
    <StreakLogo src={StreakImg} alt="Streak Logo"/>
  </StreakLogoContainer>);
}