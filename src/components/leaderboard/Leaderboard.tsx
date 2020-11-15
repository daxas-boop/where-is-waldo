import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

const Leaderboard = () => {
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <>
      {!authState.user ? (
        <h1>Must be logged in to see this page.</h1>
      ) : (
        <div>Leaderboard</div>
      )}
    </>
  );
};

export default Leaderboard;
