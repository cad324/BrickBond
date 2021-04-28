import React, { useState, useEffect } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CardContent from '@material-ui/core/CardContent';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  useParams,
  Redirect
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontFamily: 'Poppins'
  },
  primaryBtn: {
    backgroundColor: '#2F4858',
    marginTop: theme.spacing(1.5),
    color: '#fff',
    '&:hover': {
      backgroundColor: '#3c5783'
    }
  },
  progress: {
    width: `${theme.spacing(3)}px !important`,
    height: `${theme.spacing(3)}px !important`,
    marginTop: theme.spacing(1.5),
    color: '#3c5783',
    '& svg': {
      width: theme.spacing(3),
      height: theme.spacing(3)
    }
  },
  secondaryBtn: {
    backgroundColor: 'rgba(149, 0, 4, 0.5)',
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(1.5),
    padding: `${theme.spacing(0.5)}px ${theme.spacing(0.5)}px`,
    color: '#fff',
    '& span': {
      fontSize: theme.spacing(1.25),
      fontWeight: '600'
    },
    '&:hover': {
      backgroundColor: 'rgba(149, 0, 4, 0.75)'
    }
  },
  backIcon: {
    fontSize: theme.spacing(1.25),
    fontWeight: '600'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  formCtr: {
    '& label': {
      display: 'block',
      marginBottom: theme.spacing(1)
    },
    '& label span': {
      width: theme.spacing(9),
      display: 'inline-block'
    }
  },
  card: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    paddingBottom: theme.spacing(1.5)
  },
  cardEmpty: {
    textAlign: 'center',
    margin: theme.spacing(3),
    color: 'slategrey'
  },
  title: {
    fontWeight: '600',
    fontSize: theme.spacing(2.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ManageProperty = (props) => {

  const [stake, setStake] = useState(0);
  const [price, setPrice] = useState(0);

  const classes = useStyles();

  const createBrick = () => {
    props.createBrick(slug, stake, price);
    setStake(0);
    setPrice(0);
  }

  const { slug } = useParams();

  useEffect(() => {
    props.getBricks(slug);
    console.log('calling get bricks');
  }, []);

  return (
    <div className={classes.content}>
      <Toolbar/>
      {
        props.propertyDetails[slug] ?
        <>
          <Button size={'small'} className={classes.secondaryBtn}
          onClick={props.history.goBack}>
            <ArrowBackIosIcon className={classes.backIcon} />
            <Typography component="span" >Back</Typography>
          </Button>
          <div className={classes.title}>{`
            ${props.propertyDetails[slug]["street"]},
             ${props.propertyDetails[slug]["city"]},
              ${props.propertyDetails[slug]["province"]}
               ${props.propertyDetails[slug]["zip_code"]}
          `}</div>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                CREATE BRICK
              </Typography>
              <form onSubmit={createBrick} className={classes.formCtr}>
                <label>
                  <span>{`Stake (%): `}</span>
                  <input
                    type="number"
                    name="stake"
                    max={100}
                    value={stake}
                    onChange={e => setStake(e.target.value)}
                  />
                </label>
                <label>
                  <span>{`Price (CA$): `}</span>
                  <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </label>
              </form>
              {!props.creatingBrick ?
                <Button
                  onClick={createBrick}
                  size="small"
                  className={classes.primaryBtn}
                  variant="contained">
                <Typography variant="caption" component="p">Create Brick</Typography>
              </Button> : <CircularProgress thickness={5} className={classes.progress} disableShrink />}
              <Snackbar open={props.createdBrick} autoHideDuration={6000}>
                <Alert severity="success">
                  Brick creation successful! Refresh to see updated results.
                </Alert>
              </Snackbar>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                CURRENT BRICKS
              </Typography>
              {!props.loadingBrickDetails ?
                !props.bricks.length ?
                  <Typography className={classes.cardEmpty}>
                    There are no BRICKS for this property.
                  </Typography> :
                props.bricks
                  .map((brick, index) =>
                    <p key={index}>Brick {index}: Price: CA${brick.price}, Stake: {brick.stake}%</p>)
                    :
                    <>
                      <Skeleton />
                      <Skeleton animation={false} />
                      <Skeleton animation="wave" />
                    </>
            }
            </CardContent>
          </Card>
        </>
        : <Redirect to="/properties" />}
    </div>
  )
}

export default ManageProperty;
