import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import Poll from '../Poll/Poll';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <p className="description">
          Bitpoll helps determine consensus within the Bitcoin development
          community by providing polls rescricted to developers of the Bitcoin
          project.
        </p>
        <Route exact path="/" component={Poll} />
      </main>
    </div>
  );
};

export default App;
