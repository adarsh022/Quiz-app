import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function QuestionsTemplate() {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(0);
  const [correctAns, setCorrectAns] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      let apiData = await axios.get('https://quizapi.io/api/v1/questions', {
        headers: {
          'X-Api-Key': 'HKrCCkZUmvC3nY6r7XwM07Mp7V6sC8akghaOdLoI',
        },
      });

      let first = Object.values(apiData.data).filter((item) =>
        item.multiple_correct_answers && item.correct_answer != null
          ? true
          : false
      );

      let data = first.slice(0, 5);

      let selectedData = data.map((item) => {
        return [
          {
            question: item.question,
            optios: item.answers,
            answers: item.correct_answers,
          },
        ];
      });

      let answers = data.map((item) => {
        return { answers: item.correct_answers };
      });

      setQuestions(selectedData);
      setAnswers(answers);
    };
    apiCall();
  }, []);

  useEffect(() => {
    if (question) {
      const intervalId = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [questions]);

  if (timer === 16) {
    setTimer(0);
    setCount(() => (count !== 4 ? count + 1 : 4));
  }

  let data = questions[count];

  let question = data ? data[0].question : '';
  // console.log('data[0]', data);
  let options = data ? Object.entries(data[0].optios) : '';
  let ans = data ? Object.entries(data[0].answers) : '';

  let radioChangeHandler = ({ e, b }) => {
    setTimer(0);
    setUserAnswers((userAnswers) => [...userAnswers, [b, e.target.value]]);

    setTimeout(() => {
      e.target.checked = false;
      setCount(() => (count !== 5 ? count + 1 : 5));
    }, 1000);

    console.log('b', b);

    let a = e.target.value === 'true' ? setResult((result) => result + 10) : '';
  };

  // console.log('correctAns', correctAns);

  if (count === 5) {
    history.push({
      pathname: '/result',
      state: {
        answers: answers,
        userAnswers: userAnswers,
        questions: questions,
        result: result,
        correctAns: correctAns,
      },
    });
  }

  return (
    <main>
      <h4> Timer : 00:{15 - timer}</h4>
      <div className='question'>
        <h3>Question : {question} </h3>
        <form>
          {options
            ? options.map((item, index) => {
                if (correctAns.length === count) {
                  let a =
                    ans[index][1] === 'true'
                      ? setCorrectAns((correctAns) => [
                          ...correctAns,
                          [item[1]],
                        ])
                      : '';
                }
                let b = item[1];

                return (
                  <>
                    <div className='question-options'>
                      {item[1] ? (
                        <input
                          key={index}
                          type='radio'
                          value={ans[index][1]}
                          name={question}
                          onChange={(e) => radioChangeHandler({ e, b })}
                        />
                      ) : (
                        ''
                      )}
                      {item[1] ? <label key={item[0]}>{item[1]}</label> : ''}
                      <br />
                    </div>
                  </>
                );
              })
            : ''}
        </form>
      </div>
    </main>
  );
}
