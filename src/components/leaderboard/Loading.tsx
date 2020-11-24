import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  loader: {
    animation: '$spin 2s linear infinite',
    border: '10px solid #f3f3f3',
    borderTop: '10px solid #3498db',
    borderRadius: '50%',
    width: '100px',
    height: '100px',
  },
  preloader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
  text: {
    fontFamily: 'Roboto',
    color: 'white',
  },
});

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.preloader}>
      <div className={classes.loader}></div>
      <p className={classes.text}>Loading levels...</p>
    </div>
  );
}
