import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:768px)']: { flexGrow: 1, justifyContent: 'flex-end' },
  },
});

const SignedOutLinks = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link style={{ textDecoration: 'none' }} to="/signup">
        <Button>Sign up</Button>
      </Link>
      <Link style={{ textDecoration: 'none' }} to="/signin">
        <Button>Sign in</Button>
      </Link>
    </div>
  );
};

export default SignedOutLinks;
