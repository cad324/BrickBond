import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    paddingBottom: theme.spacing(1.5)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

const BricksList = (props) => {

  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
          MY BRICKS
        </Typography>
        {props.bricks
          .map((brick, index) => {
          if (props.brickOwners[index] &&
            props.brickOwners[index].toLowerCase() === props.address.toLowerCase()) {
            return (<p key={`brick-${index}`}>
              {`Brick ${index} - Price: CA$${brick.price}, Stake: ${brick.stake}%`}
            </p>)
          }
        })}
      </CardContent>
    </Card>
  )
}

export default BricksList;
