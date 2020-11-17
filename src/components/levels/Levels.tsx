import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types/state-types';
import { levels } from '../../levels';
import { selectLevel } from '../../store/actions/levelActions';
import { ILevels } from '../../types/level-types';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const Levels = () => {
  const classes = useStyles();
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLevelClick = (level: ILevels) => {
    dispatch(selectLevel(level));
    history.push('/');
  };

  return (
    <>
      {!authState.user ? (
        <h1>Must be logged in to see this page.</h1>
      ) : (
        <div>
          <Grid container spacing={2}>
            {Object.keys(levels).map((key) => {
              return (
                <Grid
                  key={key}
                  onClick={() => handleLevelClick(levels[key])}
                  item
                >
                  <Paper className={classes.paper}>
                    {levels[key].getName()}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </>
  );
};

export default Levels;
