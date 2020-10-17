import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import Question from './question';

import SessionChart from './session-chart'

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const addPositivePositive = () => {

  const ops = [
    randomIntFromInterval(1, 10),
    randomIntFromInterval(2, 20)
  ]
  const text = `${ops[0]} + ${ops[1]} = `
  const isCorrect = (answer) => answer === ops[0] + ops[1];

  return {ops, text, isCorrect}
}

const questionKeys = {
  'add_p_p' : addPositivePositive
}



const data = {

  questions: [
    'add_p_p',
  ]
}
export default () => {
  let {sessionId} = useParams()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(()=> {
    //const key = data.questions[currentIndex] 
    //const questionFn = questionKeys[key]
    //const question = questionFn();

    setCurrentQuestion(addPositivePositive())
  }, [currentIndex])

  useEffect(() => {
    setHistory((prev) => [...prev, streak])
    setCurrentIndex((prev) => prev + 1)
  }, [streak])

  const handleOnAnswer = (answer) => {
    console.log('Called', answer)
    if (answer.isCorrect) {
      setStreak((prev) => prev + 1)
    } else {
      setStreak(0)
    }
  }

  return <div>Session Id:{sessionId}
    <div>Streak: {streak}</div>
    <Question question={currentQuestion} onAnswer={handleOnAnswer}/>
    <div>{JSON.stringify(history, null, 2)}</div>
    <div style={{width: "200px"}}>
    <SessionChart data={history}/>
    </div>
  </div>


}