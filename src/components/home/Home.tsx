import React from 'react';
import NotSigned from './NotSigned';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import Game from './Game';

const Home = () => {
  const state = useSelector((state: RootState) => state);
  return state.user ? <Game /> : <NotSigned />;
};

export default Home;
