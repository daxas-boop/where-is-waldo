import React from 'react';
import Cards from './Cards';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types/state-types';
import { levels } from '../../levels/levels';
import { selectLevel } from '../../store/actions/levelActions';
import { ILevels } from '../../types/level-types';
import { useHistory } from 'react-router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '30px auto',
    },
    text: {
      marginTop: '20px',
      marginBottom: '20px',
      color: 'white',
    },
    grid: {
      justifyContent: 'center',
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

  if (!authState.user)
    return (
      <Typography className={classes.text} variant="h2" align="center">
        Must be logged in to see this page.
      </Typography>
    );

  return (
    <Container className={classes.container}>
      <Typography className={classes.text} variant="h2" align="center">
        Select a level
      </Typography>
      <Grid className={classes.grid} container spacing={2}>
        {Object.keys(levels).map((key) => {
          return (
            <Grid key={key} onClick={() => handleLevelClick(levels[key])} item>
              <Cards level={levels[key]} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Levels;
