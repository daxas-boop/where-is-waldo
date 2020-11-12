import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../../store/actions/loginActions';

const SignedInLinks = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  const state = useSelector((state) => state);

  return (
    <>
      <Avatar>H</Avatar>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default SignedInLinks;
