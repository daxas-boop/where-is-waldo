import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/state-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    margin: '30px auto',
  },
  text: {
    marginTop: '20px',
    color: 'white',
  },
});

const Leaderboard = () => {
  const classes = useStyles();
  const authState = useSelector((state: RootState) => state.auth);

  if (!authState.user)
    return (
      <Typography className={classes.text} variant="h2" align="center">
        Must be logged in to see this page.
      </Typography>
    );

  return <div>Leaderboard</div>;
};

export default Leaderboard;
