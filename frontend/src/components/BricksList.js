import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import {
  Link
} from "react-router-dom";

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
  },
  brickItem: {
    display: 'flex',
    '& p': {
      flexGrow: 1
    },
    '& a': {
      fontSize: theme.spacing(1.5),
      color: '#1b6a9d'
    }
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.3em',
      borderRadius: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.4)',
      outline: 'none'
    }
  },
  brickList: {
    overflowY: 'scroll',
    maxHeight: 150,
    paddingRight: theme.spacing(2)
  }
}));

const BricksList = (props) => {

  const classes = useStyles();
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (!props.propertyBricks.length && reload) {
        props.getPropertyBricks();
    } else {
      setReload(false);
    }
  })

  return (
    <Card>
      <CardContent>
        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
          MY BRICKS
        </Typography>
        <div className={classes.brickList}>
          {props.bricks
            .map((brick, index) => {
            if (props.brickOwners[index] &&
              props.brickOwners[index].toLowerCase() === props.address.toLowerCase()) {
              return (<div className={classes.brickItem} key={`brick-${index}`}>
                <p>{`Brick ${index} - Price: CA$${brick.price}, Stake: ${brick.stake}%`}</p>
                {props.propertyBricks[index] ?
                  <p><Link to={`/property/${props.propertyBricks[index]}`}>
                    View Property</Link>
                  </p> : null }
              </div>)
            }
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default BricksList;
