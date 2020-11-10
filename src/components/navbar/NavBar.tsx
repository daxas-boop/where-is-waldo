import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '10vh',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
    links: {
      textDecoration: 'none',
    },
  })
);

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Link className={classes.links} to="/">
          <Button>Home</Button>
        </Link>
        <Link className={classes.links} to="/levels">
          <Button>Levels</Button>
        </Link>
        <Link className={classes.links} to="/leaderboard">
          <Button>Leaderboard</Button>
        </Link>
        <Typography variant="h4" className={classes.title}>
          Where's Waldo
        </Typography>
        <SignedInLinks></SignedInLinks>
        <SignedOutLinks></SignedOutLinks>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
