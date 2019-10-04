import React from 'react';

import { Switch, Route } from 'react-router-dom';

import NavBar from './NavBar';

import Home from '../pages/Home';

import '../assets/App.scss';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;