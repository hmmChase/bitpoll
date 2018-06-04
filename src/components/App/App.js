import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import Poll from '../Poll/Poll';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Poll} />
    </div>
  );
};

export default App;
