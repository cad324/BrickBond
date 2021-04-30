import React, { useEffect } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    marginBottom: theme.spacing(1.5)
  },
  card: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardTitle: {
    fontSize: theme.spacing(1.75),
    fontWeight: '600'
  },
  cardContent: {
    paddingBottom: 0
  },
  brickCount: {
    padding: `${theme.spacing(1)}px 0`
  },
  cardActions: {
    '& a': {
      textDecoration: 'none',
      fontSize: theme.spacing(1.5),
      color: '#2F4858'
    }
  }
}));

const BrowseProperties = (props) => {

  useEffect(() => {
    props.getAllPropertyBrickCounts();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Toolbar/>
      <Typography className={classes.title} variant="h5">
        Browse Properties
      </Typography>
      {
        props.allProperties.map((property, index) =>
          {
            return (
            <Card
              key={`${property.street}-${property.city}`}
              className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography className={classes.cardTitle}>
                    {`${property.street}, ${property.city},
                     ${property.province} ${property.zip_code}`}
                  </Typography>
                  <Typography className={classes.brickCount}>
                    {props.propertyBrickCount[index] ? props.propertyBrickCount[index]
                      : 0} bricks
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className={classes.cardActions}>
                    <Link to={`/property/${index}`}>See More</Link>
                  </Button>
                </CardActions>
              </Card>)
            }
      )
      }
    </div>
  )
}

export default BrowseProperties;
