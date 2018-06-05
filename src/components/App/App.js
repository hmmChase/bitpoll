import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../../containers/Header/Header';
import Poll from '../../containers/Poll/Poll';
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <p className="description">
          Are you a Bitcoin developer? We want your opinion!
        </p>
        <Route exact path="/" component={Poll} />
      </main>
    </div>
  );
};

export default App;
