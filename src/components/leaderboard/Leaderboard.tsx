import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/state-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import firebase from '../../config/fbConfig';
import 'firebase/firestore';
import { Container, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider/Divider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  text: {
    marginTop: '20px',
    color: 'white',
  },
  leaderboardItem: {
    textAlign: 'center',
  },
});

const Leaderboard = () => {
  const classes = useStyles();
  const authState = useSelector((state: RootState) => state.auth);
  const [leaderboards, setLeaderboards] = useState<any>();
  const [leaderboardSelected, setLeaderboardSelected] = useState<any>();

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
        setLeaderboards(leaderboards);
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
        {leaderboards &&
          leaderboards.map((leaderboard: any) => (
            <List
              key={leaderboard.id}
              component="nav"
              aria-label="secondary mailbox folders"
            >
              <ListItem
                button
                onClick={() => {
                  setLeaderboardSelected(leaderboard);
                }}
              >
                <ListItemText primary={leaderboard.id} />
              </ListItem>
            </List>
          ))}
      </Container>
      <Container>
        <Typography className={classes.text} variant="h3" align="center">
          Top 10
        </Typography>
        {leaderboardSelected ? (
          <List aria-label="leaderboard times">
            {leaderboardSelected.data.top_10.map((score: any) => (
              <React.Fragment key={score.timeStamp}>
                <ListItem>
                  <ListItemText
                    className={classes.leaderboardItem}
                    primary={score.time}
                    secondary={score.userName}
                  />
                </ListItem>
                <Divider></Divider>
              </React.Fragment>
            ))}
          </List>
        ) : (
          <ListItem>
            <ListItemText
              className={classes.leaderboardItem}
              primary="Select a level"
            />
          </ListItem>
        )}
      </Container>
    </div>
  );
};
export default Leaderboard;
