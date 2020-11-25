import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { Link } from 'react-router-dom';
import { RootState } from '../../types/state-types';
import { useSelector } from 'react-redux';
import { Button, Typography, Toolbar, AppBar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '10vh',
      // eslint-disable-next-line no-useless-computed-key
      ['@media (max-width:468px)']: { padding: 0 },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
      ['@media (max-width:768px)']: { display: 'none' }, // eslint-disable-line no-useless-computed-key
    },
    links: {
      margin: 5,
      textDecoration: 'none',
    },
  })
);

const NavBar = () => {
  const classes = useStyles();
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Link className={classes.links} to="/">
          <HomeIcon />
        </Link>
        <Link className={classes.links} to="/levels">
          <Button>Levels</Button>
        </Link>
        <Link className={classes.links} to="/leaderboard">
          <Button>Leaderboard</Button>
        </Link>
        <Typography variant="h3" className={classes.title}>
          Where's Waldo
        </Typography>
        {authState.user ? <SignedInLinks /> : <SignedOutLinks />}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
