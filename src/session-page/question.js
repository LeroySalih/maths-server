import React, {useEffect, useState} from 'react';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

export default ({question, onAnswer}) => {

  const [form, setForm] = useState({})
  const [isCorrect, setIsCorrect] = useState(null);

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
    setIsCorrect(correct);
    onAnswer && onAnswer({question, answer: form.answer, isCorrect : correct})
    
  }
return <div>
        {question.text}
        <Input value={form.answer || ""} name="answer" onChange={handleChange}/>
        <Button onClick={handleClick}>Check</Button>
        <div>{isCorrect && (<span>Correct</span>)}</div>
        <div>{isCorrect === false && (<span>Incorrect</span>)}</div>
        <div>{isCorrect === null && (<span>Not Answered</span>)}</div>
        
        </div>
}