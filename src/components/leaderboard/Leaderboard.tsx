import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

const Leaderboard = () => {
  const state = useSelector((state: RootState) => state);

  return (
    <>
      {!state.user ? (
        <h1>Must be logged in to see this page.</h1>
      ) : (
        <div>Leaderboard</div>
      )}
    </>
  );
};

export default Leaderboard;
