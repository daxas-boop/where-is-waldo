import React from 'react';
import { ILevels } from '../../types/level-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  CardMedia,
  CardContent,
  CardActionArea,
  Card,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 450,
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:468px)']: { maxWidth: 300 },
  },
  media: {
    height: 300,
    width: '100%',
  },
});

export default function Cards(props: { level: ILevels }) {
  const { level } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={level.image}
          title={level.name}
        />
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="h2">
            {level.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
