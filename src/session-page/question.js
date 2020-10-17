import React from 'react';

export default ({question}) => {
  if (question === null || question === undefined) {
    return <div>No Question Available</div>
  }
return <div>Question Found {JSON.stringify(question, null, 2)}</div>
}