import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';
import { signUp } from '../../store/actions/loginActions';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  font-family: Roboto;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '25ch',
      },
    },
  })
);

const Title = styled.h2`
  text-align: center;
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(email, password);
  };

  return (
    <StyledForm
      onSubmit={(e) => submitForm(e)}
      className={classes.root}
      autoComplete="off"
    >
      <Title>Create your account</Title>
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
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </StyledForm>
  );
};

export default SignUp;
