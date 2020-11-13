import React, { useState } from 'react';
import Header from './components/navbar/NavBar';
import Leaderboard from './components/leaderboard/Leaderboard';
import Levels from './components/levels/Levels';
import Home from './components/home/Home';
import SignIn from './components/navbar/SignIn';
import SignUp from './components/navbar/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './config/fbConfig';
import { useDispatch } from 'react-redux';
import Loading from './components/loading/Loading';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  firebase.auth().onAuthStateChanged((user) => {
    dispatch({ type: 'USER_UPDATED', payload: user });
    setLoading(false);
  });

  if (loading) return <Loading />;

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/levels" component={Levels}></Route>
        <Route path="/leaderboard" component={Leaderboard}></Route>
        <Route path="/signin" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
      </Switch>
    </Router>
  );
}

export default App;
