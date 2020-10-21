import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom';
import Question from './question';
import styled from 'styled-components';
import FirebaseContext from '../firebase';
import {AppContext} from '../app';
import StreakLogo from '../streak-logo';
import {useSnackbar} from 'notistack';

import SessionChart from './session-chart'
import {
  addPositivePositive,
  addNegativePositive,
  addPositiveNegative,
  addNegativeNegative,
  subtractPositivePositive,
  subtractPositiveNegative,
  subtractNegativePositive,
  subtractNegativeNegative,

  multPositivePositive,
  multPositiveNegative,
  multNegativePositive,
  multNegativeNegative,

  multPositivePositiveD,
  multPositiveNegativeD,
  multNegativePositiveD,
  multNegativeNegativeD,

  multPositivePositiveDD,
  multPositiveNegativeDD,
  multNegativePositiveDD,
  multNegativeNegativeDD,


} from './questions';


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
  display: flex;
  flex-direction: column;
`
const StreakPanel = styled.div`
  display: grid;
  grid-template-columns : 100px 200px 100px;
  grid-template-rows: 30px;
  grid-template-areas: "logo current" "logo highest";
  border-bottom: solid silver 3px;
`


const StreakCurrent = styled.div`
  font-family: 'Open Sans';
  font-size: 1.5rem;
`

const StreakHighest = styled.div`
  font-family: 'Open Sans';
  font-size: 1.5rem;
`

const streakColor = (score) => {
  const intScore = parseInt(score)
  
  if (intScore >= 0 && intScore < 10)  return '100'; 
  if (intScore >= 10 && intScore < 20) return '200'; 
  if (intScore >= 20) return 255;

}

const StreakCurrentScore = styled.div`
  font-family: 'Open Sans';
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => `rgb(${streakColor(props.score)}, 0, 0)`}
`

const StreakHighestScore = styled.div`
  font-family: 'Open Sans';
  font-size: 1.5rem;
  font-weight: bold;
`


const questionKeys = {
  'add_p_p' : addPositivePositive,
  'add_n_p' : addNegativePositive,
  'add_p_n' : addPositiveNegative,
  'add_n_n' : addNegativeNegative,
  'sub_p_p' : subtractPositivePositive,
  'sub_p_n' : subtractPositiveNegative,
  'sub_n_p' : subtractNegativePositive,
  'sub_n_n' : subtractNegativeNegative,
  'mult_p_p' : multPositivePositive,
  'mult_p_n' : multPositiveNegative,
  'mult_n_p' : multNegativePositive,
  'mult_n_n' : multNegativeNegative,

  'mult_p_p_d' : multPositivePositiveD,
  'mult_p_n_d' : multPositiveNegativeD,
  'mult_n_p_d' : multNegativePositiveD,
  'mult_n_n_d' : multNegativeNegativeD,

  'mult_p_p_dd' : multPositivePositiveDD,
  'mult_p_n_dd' : multPositiveNegativeDD,
  'mult_n_p_dd' : multNegativePositiveDD,
  'mult_n_n_dd' : multNegativeNegativeDD
}

const sessions = {
  'add-all' : { questions : [
    'add_p_p',
    'add_n_p',
    'add_p_n',
    'add_n_n',
    'sub_p_p',
    'sub_n_p',
    'sub_p_n',
    'sub_n_n',
    'mult_p_p',
    'mult_n_p',
    'mult_p_n',
    'mult_n_n',
    'mult_p_p_d',
    'mult_n_p_d',
    'mult_p_n_d',
    'mult_n_n_d',
    'mult_p_p_dd',
    'mult_n_p_dd',
    'mult_p_n_dd',
    'mult_n_n_dd',
  ] },

  'sub-all' : { questions : [
    'sub_p_p',
    'sub_n_p',
    'sub_p_n',
    'sub_n_n',
  ] },

  'mult-all' : { questions : [
    'mult_p_p',
    'mult_n_p',
    'mult_p_n',
    'mult_n_n',
  ] },

  'mult-d' : { questions : [
    'mult_p_p_d',
    'mult_n_p_d',
    'mult_p_n_d',
    'mult_n_n_d',
  ] },

  'mult-dd' : { questions : [
    'mult_p_p_dd',
    'mult_n_p_dd',
    'mult_p_n_dd',
    'mult_n_n_dd',
  ] },


}


export default () => {
  let {sessionId} = useParams()
  
  const {userProfile} = useContext(AppContext);
  const firebase = useContext(FirebaseContext);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState([]);
  const QUESTIONS_PER_LEVEL = 3;
  const [questions, setQuestions] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect (()=> {
    if (!sessions[sessionId])
      return;

    const q = sessions[sessionId].questions;
    setQuestions (q);

    if (!userProfile)
      return;

    // new session so add the user.
    firebase.session(sessionId)
        .child(userProfile.uid)
        .child('name')
        .set(`${userProfile.firstName} ${userProfile.familyName}`)
  }, [sessionId, userProfile])


  


  useEffect(()=> {
    if (questions){
      const modifiedIndex = questionLevel(currentIndex, questions)
      const key = questions[modifiedIndex]; 
      const questionFn = questionKeys[key]
      const question = questionFn();
      setCurrentQuestion(question)
    }
    
  }, [currentIndex])

  useEffect(()=> {

    if (userProfile){

      // Update the User Profile
      firebase.userProfile(userProfile.uid)
        .child('sessions')
        .child(sessionId)
        .child('highestStreak')
        .set(getHighest())

      // Update the Sessions with the highest streak
      firebase.session(sessionId)
        .child(userProfile.uid)
        .child('highestStreak')
        .set(getHighest())
    }
    
  }, [history])

  useEffect(() => {
    setHistory((prev) => [...prev, streak])

    if (userProfile){
      firebase.userProfile(userProfile.uid)
      .child('sessions')
      .child(sessionId)
      .child('streak')
      .set(streak);


      firebase.session(sessionId)
      .child(userProfile.uid)
      .child('streak')
      .set(streak);

    }

    if (streak === 0)
      // reset index to start questions form start
      setCurrentIndex(0)
    else
      setCurrentIndex((prev) => prev + 1)
  }, [streak])

  const questionLevel = (currentIndex, questions) => {
    return (!currentIndex || currentIndex < 0 || !questions) ? 0 : (Math.floor(currentIndex / QUESTIONS_PER_LEVEL)) % questions.length;
  }

  const moveNextQuestion = (isCorrect) => {
    if (isCorrect) {
      setStreak((prev) => prev + 1)
    } else {
      setStreak(0)
    }
  }
  const handleOnAnswer = (answer) => {
    
    const historyObj = {answer: answer.answer, text: answer.question.text, isCorrect: answer.isCorrect, ts: Date.now()};
    
    console.log(historyObj)

    // update the history
    firebase.userProfile(userProfile.uid)
      .child('sessions')
      .child(sessionId)
      .child('history')
      .push(historyObj)
      .then(() => {
        if (answer.isCorrect)
          enqueueSnackbar('Correct :) ', { autoHideDuration: 800, onExited: () => moveNextQuestion(true), variant: 'success' });
        else
          enqueueSnackbar('Whoops!', { autoHideDuration: 800, onExited: () => moveNextQuestion(false), variant: 'error' });
      })
      .catch(() => {
        enqueueSnackbar('Error! Something went wrong writing the history.', { autoHideDuration: 800, onExited: () => moveNextQuestion(true), variant: 'error' });
      })
      


    
  }

  const getHighest = () => {
    return history && history.length > 0 ? Math.max(...history) : 0;
    
  }

  if (!questions) 
    return <div>No questions found for sessionId:  {sessionId}</div>

  return <Page>
    <Container>
      <Panel>
        <StreakPanel>
          <div style={{gridArea: "logo"}}><StreakLogo/></div>
          <StreakCurrent>Current Streak: </StreakCurrent>
          <StreakCurrentScore score={streak}>{streak}</StreakCurrentScore>
          <StreakHighest>Highest Streak: </StreakHighest>
          <StreakHighestScore>{getHighest()}</StreakHighestScore>
        </StreakPanel>
        
        <Question question={currentQuestion} onAnswer={handleOnAnswer}/>
        
        <div style={{width: "200px", height: "200px"}}>
        <SessionChart data={history}/>
        </div>
        </Panel>
    </Container>
  </Page>


}