import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import Question from './question';

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

  useEffect(()=> {
    const key = data.questions[currentIndex] 
    const questionFn = questionKeys[key]
    const question = questionFn();

    setCurrentQuestion(question)
  }, [currentIndex])


  return <div>Session Id:{sessionId}
  
    <Question question={currentQuestion}/>
  </div>


}