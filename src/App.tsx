import React, { useState, useEffect } from 'react';
import Header from './components/navbar/NavBar';
import Leaderboard from './components/leaderboard/Leaderboard';
import Levels from './components/levels/Levels';
import Home from './components/home/Home';
import SignIn from './components/navbar/SignIn';
import SignUp from './components/navbar/SignUp';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './config/fbConfig';
import { useDispatch } from 'react-redux';
import Loading from './components/loading/Loading';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    firebase.auth().onAuthStateChanged(async (user) => {
      if (isMounted) {
        if (user) {
          const db = firebase.firestore();
          const userRef = await db.collection('users').doc(user.uid).get();
          const userData = userRef.data();
          dispatch({ type: 'USER_UPDATED', payload: userData });
        } else {
          dispatch({ type: 'USER_UPDATED', payload: null });
        }
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  });

  if (loading) return <Loading />;

  return (
    <Router basename="/">
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
