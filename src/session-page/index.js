import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom';
import Question from './question';
import styled from 'styled-components';
import FirebaseContext from '../firebase';
import {AppContext} from '../app';
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
  'add' : { questions : [
    'add_p_p',
    'add_n_p',
    'add_p_n',
    'add_n_n',
  ] },

  'sub' : { questions : [
    'sub_p_p',
    'sub_n_p',
    'sub_p_n',
    'sub_n_n',
  ] },

  'mult' : { questions : [
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

  useEffect (()=> {
    setQuestions (sessions[sessionId].questions);
  }, [sessionId])


  


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
      firebase.userProfile(userProfile.uid)
      .child('sessions')
      .child(sessionId)
      .child('highest-streak')
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
      .set(streak)

      
  

    }


    
    if (streak === 0)
      // reset index to start questions form start
      setCurrentIndex(0)
    else
      setCurrentIndex((prev) => prev + 1)
  }, [streak])

  const questionLevel = (currentIndex, questions) => {
    //console.log(`Question Level`, (Math.floor(currentIndex / QUESTIONS_PER_LEVEL)) % questions.length)
    return (!currentIndex || currentIndex < 0 || !questions) ? 0 : (Math.floor(currentIndex / QUESTIONS_PER_LEVEL)) % questions.length;
  }

  const handleOnAnswer = (answer) => {
    console.log('Called', answer)
    
    console.log(`Setting history for ${userProfile.uid}`)

    const historyObj = {answer: answer.answer, text: answer.question.text, isCorrect: answer.isCorrect, ts: Date.now()};
    console.log(historyObj);

    // update the history
    firebase.userProfile(userProfile.uid)
      .child('sessions')
      .child(sessionId)
      .child('history')
      .push(historyObj)
      


    if (answer.isCorrect) {
      setStreak((prev) => prev + 1)
    } else {
      setStreak(0)
    }
  }

  const getHighest = () => {
  
    return Math.max(...history)
    
  }

  return <Page>
    <Container>
      <Panel>
        <div>Current Streak: {streak}</div>
        <div>Highest Streak: {getHighest()}</div>
        <Question question={currentQuestion} onAnswer={handleOnAnswer}/>
        
        <div style={{width: "200px", height: "200px"}}>
        <SessionChart data={history}/>
        </div>
        </Panel>
    </Container>
  </Page>


}