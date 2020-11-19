import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { ILevels } from '../../types/level-types';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
    width: 400,
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
