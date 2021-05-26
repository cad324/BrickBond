import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import {
  Link
} from "react-router-dom";
import {styles} from './BrickList.Style';

const useStyles = makeStyles(styles);

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
        {!props.bricks.length ?
          <Typography className={classes.cardEmpty}>
            You currently have no bricks.
          </Typography> : null
        }
      </CardContent>
    </Card>
  )
}

export default BricksList;
