import React from 'react';

import { Switch, Route } from 'react-router-dom';

import NavBar from './NavBar';
// import SideBar from './SideBar';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Players from '../pages/Players';
import PlayerDetail from '../pages/PlayerDetail';
import GameSettings from '../pages/GameSettings';

import '../assets/App.scss';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/players' component={Players} />
        <Route exact path='/player/:id' component={PlayerDetail} />
        <Route exact path='/settings' component={GameSettings} />
      </Switch>
    </div>
  );
}

export default App;