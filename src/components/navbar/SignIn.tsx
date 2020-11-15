import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { signIn } from '../../store/actions/loginActions';
import { RootState } from '../../store/types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '360px',
      },
    },
  })
);

const StyledButton = styled(Button)`
  width: 200px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  font-family: Roboto;
`;

const Title = styled.h2`
  text-align: center;
`;

const ErrorText = styled.p`
  text-align: center;
  color: red;
`;

const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (authState.user) {
      history.push('/');
    }
  }, [history, authState.user]);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  return (
    <StyledForm
      onSubmit={(e) => submitForm(e)}
      className={classes.root}
      autoComplete="off"
    >
      <Title>Sign In</Title>
      <Input
        id="email"
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        id="password"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <StyledButton type="submit" variant="contained" color="primary">
        Submit
      </StyledButton>
      {authState.authError && (
        <ErrorText>{authState.authError.message}</ErrorText>
      )}
    </StyledForm>
  );
};

export default SignIn;
