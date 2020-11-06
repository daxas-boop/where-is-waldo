import React from 'react';
import Header from './components/header/Header';
import Leaderboard from './components/leaderboard/Leaderboard';
import Levels from './components/levels/Levels';
import Home from './components/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/levels" component={Levels}></Route>
        <Route path="/leaderboard" component={Leaderboard}></Route>
      </Switch>
    </Router>
  );
}

export default App;
