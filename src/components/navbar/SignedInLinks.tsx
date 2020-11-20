import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../../store/actions/loginActions';

const Container = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-grow: 1;
    justify-content: flex-end;
  }
`;

const SignedInLinks = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <Container>
      <Avatar>H</Avatar>
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
};

export default SignedInLinks;
