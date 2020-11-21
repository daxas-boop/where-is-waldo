import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { signUp } from '../../store/actions/loginActions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/state-types';
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
      maxWidth: '100%',
      '& > *': {
        margin: theme.spacing(2),
        width: '360px',
        maxWidth: '100%',
      },
    },
    button: {
      alignItems: 'center',
      width: '200px',
    },
    title: {
      width: '80%',
    },
  })
);

const SignUp = (props: any) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch({ type: 'CLEANUP_LOGIN_ERROR' });
  }, [dispatch]);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUp(email, password, username));
  };

  if (authState.user) return <Redirect to="/" />;

  return (
    <form
      onSubmit={(e) => submitForm(e)}
      className={classes.root}
      autoComplete="off"
    >
      <Typography className={classes.title} variant="h2" align="center">
        Create your account
      </Typography>

      <Input
        style={{ color: 'white' }}
        id="username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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

export default SignUp;
