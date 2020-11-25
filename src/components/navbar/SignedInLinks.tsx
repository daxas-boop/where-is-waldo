import React from 'react';
import { RootState, AuthState } from '../../types/state-types';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/loginActions';
import { Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:768px)']: { flexGrow: 1, justifyContent: 'flex-end' },
  },
  avatar: {
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:468px)']: { display: 'none' },
  },
});

const SignedInLinks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const initialName = authState.user!.username[0].toUpperCase();

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>{initialName}</Avatar>
      <Button onClick={handleClick}>Logout</Button>
    </div>
  );
};

export default SignedInLinks;
