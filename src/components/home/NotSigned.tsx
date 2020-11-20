import React from 'react';
import SignUp from '../navbar/SignUp';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Roboto',
      color: 'white',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    text: {
      marginTop: '20px',
    },
  })
);

const NotSigned = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <SignUp />
      <Typography className={classes.text} align="center" variant="h5">
        Already have an account? <Link to="/signin">Sign In</Link>
      </Typography>
    </Container>
  );
};

export default NotSigned;
