import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/state-types';
import firebase from '../../config/fbConfig';
import 'firebase/firestore';
import {
  Container,
  CircularProgress,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:468px)']: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 4fr',
    },
  },
  text: {
    marginTop: '20px',
    color: 'white',
  },
  tableContainer: {
    width: '70%',
    margin: '0px auto',
    backgroundColor: '#424242',
    color: '#424242',
    fontSize: '20px',
    '@media (max-width:468px)': {
      width: '90%',
    },
  },
  table: {
    width: '100%',
    fontSize: '20px',
    backgroundColor: '#424242',
  },
  hideLastBorder: {
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
  button: {
    width: '100%',
  },
});

const Leaderboard = () => {
  const classes = useStyles();
  const authState = useSelector((state: RootState) => state.auth);
  const [leaderboards, setLeaderboards] = useState<any>();
  const [leaderboardSelected, setLeaderboardSelected] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authState.user) {
      const db = firebase.firestore();
      const fetchLeaderboards = async () => {
        const leaderboardsPromise = await db.collection('leaderboards').get();
        const leaderboards = leaderboardsPromise.docs.map(function (lead) {
          return {
            id: lead.id,
            data: lead.data(),
          };
        });
        const myComparator = (a: any, b: any) => a.time.localeCompare(b.time);
        leaderboards.forEach((leaderboard: any) => {
          leaderboard.data.top_10.sort(myComparator);
        });
        setLeaderboards(leaderboards);
        setLoading(false);
      };
      fetchLeaderboards();
    }
  }, [authState]);

  if (!authState.user)
    return (
      <Typography className={classes.text} variant="h2" align="center">
        Must be logged in to see this page.
      </Typography>
    );

  return (
    <div className={classes.root}>
      <Container>
        <div>
          <Typography className={classes.text} variant="h3" align="center">
            Levels
          </Typography>
          {loading && (
            <div style={{ display: 'flex' }}>
              <CircularProgress style={{ margin: '0 auto' }} />
            </div>
          )}
          {leaderboards &&
            leaderboards.map((leaderboard: any) => (
              <Button
                color="primary"
                variant="outlined"
                key={leaderboard.id}
                className={classes.button}
                onClick={() => {
                  setLeaderboardSelected(leaderboard);
                }}
              >
                {leaderboard.id}
              </Button>
            ))}
        </div>
      </Container>

      <Container>
        <Typography className={classes.text} variant="h3" align="center">
          Top 10
        </Typography>

        {leaderboardSelected ? (
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">User</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboardSelected.data.top_10.map(
                  (row: any, index: number) => (
                    <TableRow key={index} className={classes.hideLastBorder}>
                      <TableCell align="center">{row.userName}</TableCell>
                      <TableCell align="center">{row.time}</TableCell>
                      <TableCell component="th" align="center" scope="row">
                        {index + 1}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography className={classes.text} variant="h6" align="center">
            Please select a level
          </Typography>
        )}
      </Container>
    </div>
  );
};
export default Leaderboard;
