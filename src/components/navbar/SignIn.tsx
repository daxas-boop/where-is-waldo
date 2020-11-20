import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { signIn } from '../../store/actions/loginActions';
import { RootState } from '../../types/state-types';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '10px',
      fontFamily: 'Roboto',
      color: 'white',
      '& > *': {
        margin: theme.spacing(2),
        width: '360px',
      },
    },
    button: {
      width: '200px',
    },
  })
);

const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch({ type: 'CLEANUP_LOGIN_ERROR' });
  }, [dispatch]);

  const submitForm = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  if (authState.user) return <Redirect to="/" />;

  return (
    <form
      onSubmit={(e: React.FormEvent<Element>) => submitForm(e)}
      className={classes.root}
      autoComplete="off"
    >
      <Typography variant="h2" align="center">
        Sign In
      </Typography>
      <Input
        style={{ color: 'white' }}
        id="email"
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        style={{ color: 'white' }}
        id="password"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        className={classes.button}
        type="submit"
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
      {authState.authError && (
        <Typography color="error" variant="h5" align="center">
          {authState.authError.message}
        </Typography>
      )}
    </form>
  );
};

export default SignIn;
