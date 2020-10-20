import React, {useEffect, useState} from 'react';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const QuestionText = styled.div`
  font-family: 'Open Sans';
  font-size: 5rem;
`

const AnswerInput = styled.div`
  border : solid 1px silver;
  border-radius: 10px;
  padding: 10px;
  display: flex;
`
export default ({question, onAnswer}) => {

  const [form, setForm] = useState({})
  // const [isCorrect, setIsCorrect] = useState(null);

  useEffect(()=>{
    setForm({})
  }, 
  [question]
  )



  if (question === null || question === undefined) {
    return <div>No Question Available</div>
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setForm((prev) => ({ ...form, [name]: value}) );
  }

  const handleClick = () => {
    
    const correct = question.isCorrect(form.answer)
    onAnswer && onAnswer({question, answer: form.answer, isCorrect : correct})

    //setIsCorrect(correct);
    
  }
return <div>
        
        <QuestionText>{question.text}</QuestionText>
        <AnswerInput>
          
          <Input style={{flex: 1}}value={form.answer || ""} 
                 name="answer" 
                 onChange={handleChange}/>

          <Button onClick={handleClick}>Check</Button>

        </AnswerInput>
        
        
        </div>
}