import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/loginActions';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:768px)']: { flexGrow: 1, justifyContent: 'flex-end' },
  },
});

const SignedInLinks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div className={classes.root}>
      <Avatar>H</Avatar>
      <Button onClick={handleClick}>Logout</Button>
    </div>
  );
};

export default SignedInLinks;
