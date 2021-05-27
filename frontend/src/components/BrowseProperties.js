import React, { useEffect } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Skeleton from '@material-ui/lab/Skeleton';
import {styles} from './BrowseProperties.Style';
import {Helmet} from "react-helmet";
import {
  Link
} from "react-router-dom";
import { setPage } from '../features/page/currentPageSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(styles);

const BrowseProperties = (props) => {

  useEffect(() => {
    props.getAllPropertyBrickCounts();
    dispatch(setPage('/properties'));
  }, []);

  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <div className={classes.content}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BrickBonds | Browse Properties</title>
      </Helmet>
      <Toolbar/>
      <Typography className={classes.title} variant="h5">
        Browse Properties
      </Typography>
      {props.allProperties.length ?
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
      ) : !props.allProperties ?
        <>
          <Skeleton className={classes.cardSkeleton} variant="rect" height={88} />
          <Skeleton className={classes.cardSkeleton} animation={false} variant="rect"
          height={88} />
          <Skeleton className={classes.cardSkeleton} animation="wave" variant="rect"
          height={88} />
        </> :
        <Typography className={classes.subtitle}>
          There are no properties to display.
        </Typography>
      }
    </div>
  )
}

export default BrowseProperties;
