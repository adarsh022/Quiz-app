import React from 'react';
import { Route } from 'react-router';
import Header from './Component/Header';
import Homepage from './Component/Homepage';
import QuestionsTemplate from './Component/QuestionsTemplate';
import Result from './Component/Result';

export default function App() {
  return (
    <>
      <Header />
      <Route exact path='/' render={() => <Homepage />} />
      <Route exact path='/Questions' render={() => <QuestionsTemplate />} />
      <Route exact path='/result' render={() => <Result />} />
    </>
  );
}
