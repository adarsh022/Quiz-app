import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const userAnswres = location.state.userAnswers;
  const questions = location.state.questions;
  const result = location.state.result;
  const correctAns = location.state.correctAns;

  console.log('userAnswres', userAnswres);

  return (
    <div className='result'>
      <h1>Marks Obtained : {result} / 50</h1>
      <div className='container'>
        <div className='user-ans'>
          <h2>Your Given Answers</h2>
          {questions.map((item, index) => {
            return (
              <>
                <h4>{item[0].question}</h4>
                <p>{userAnswres[index][0]}</p>
              </>
            );
          })}
        </div>
        <div className='correct-ans'>
          <h2>All Correct Answers</h2>
          {questions.map((item, index) => {
            return (
              <>
                <h4>{item[0].question}</h4>
                <p>{correctAns[index]}</p>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
