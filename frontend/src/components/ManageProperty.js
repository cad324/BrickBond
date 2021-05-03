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
import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
import {Helmet} from "react-helmet";
import {
  useParams
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontFamily: 'Poppins'
  },
  primaryBtn: {
    backgroundColor: '#2F4858',
    marginTop: theme.spacing(1.5),
    fontSize: theme.spacing(1.75),
    color: '#fff',
    '&:hover': {
      backgroundColor: '#3c5783'
    }
  },
  buyBtn: {
    backgroundColor: '#005500',
    margin: 'auto',
    color: '#fff',
    fontSize: theme.spacing(1.75),
    '&:hover': {
      backgroundColor: '#418800'
    }
  },
  approveBtn: {
    backgroundColor: '#2F4858',
    marginLeft: theme.spacing(1.5),
    padding: `0 ${theme.spacing(1)}px`,
    color: '#fff',
    fontSize: theme.spacing(1.75),
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
  progressWide: {
    width: `${theme.spacing(3)}px !important`,
    height: `${theme.spacing(3)}px !important`,
    marginTop: theme.spacing(1.5),
    color: '#3c5783',
    marginLeft: theme.spacing(2.75),
    marginTop: theme.spacing(2.75),
    '& svg': {
      width: theme.spacing(3),
      height: theme.spacing(3)
    }
  },
  chip: {
    margin: 'auto',
    marginLeft: theme.spacing(1)
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
  brickItem: {
    display: 'flex',
    '& p': {
      flexGrow: 1,
      fontWeight: '700',
      margin: 0
    },
    '& h6': {
      fontSize: theme.spacing(1.75),
      fontWeight: '600',
      marginBottom: theme.spacing(0.5)
    },
    flexWrap: 'wrap'
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
  },
  approveList: {
    paddingLeft: theme.spacing(1),
    listStyle: 'none',
    '& li': {
      marginBottom: theme.spacing(0.75)
    }
  }
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ManageProperty = (props) => {

  const [stake, setStake] = useState(0);
  const [price, setPrice] = useState(0);
  const [brickApprovalRequests, setBrickApprovalRequests] = useState([]);

  const classes = useStyles();

  const createBrick = () => {
    props.createBrick(slug, stake, price);
    setStake(0);
    setPrice(0);
  }

  const { slug } = useParams();

  useEffect(() => {
    props.getAddress();
    props.updateBrickApprovalRequests();
    props.getBricks(slug);
    props.getAllProperties();
    props.setIsPropertyOwner(slug);
    console.log('[APPROVED LIST]', props.approvedList)
  }, []);

  useEffect(() => {
    props.brickApprovalRequests.map((item, index) => {
      let tempBrickApprovalRequests = brickApprovalRequests;
      let addressArr = [];
      item.map((address, i) => {
        addressArr[i] = address.toLowerCase();
      });
      tempBrickApprovalRequests[index] = addressArr;
      setBrickApprovalRequests(tempBrickApprovalRequests);
    })
  });

  return (
    <div className={classes.content}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BrickBonds | Manage Property</title>
      </Helmet>
      <Toolbar/>
      {
        props.allProperties[slug] && props.approvedList ?
        <>
          <Button size={'small'} className={classes.secondaryBtn}
          onClick={props.history.goBack}>
            <ArrowBackIosIcon className={classes.backIcon} />
            <Typography component="span" >Back</Typography>
          </Button>
          <div className={classes.title}>{`
            ${props.allProperties[slug]["street"]},
             ${props.allProperties[slug]["city"]},
              ${props.allProperties[slug]["province"]}
               ${props.allProperties[slug]["zip_code"]}
          `}</div>
          {props.isPropertyOwner ?
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
          </Card> : null}
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
                    <div className={classes.brickItem} key={index}>
                      <p>
                        Brick {index} - Price: CA${brick.price}, Stake: {brick.stake}%
                      </p>
                      {props.address.toLowerCase() === props.brickOwners[index].toLowerCase()
                        && props.brickApprovalRequests[index] ?
                        <ol className={classes.approveList}>
                          {props.brickApprovalRequests[index].length ?
                            <Typography variant="h6">Buyers</Typography> : null
                          }
                          {
                            props.brickApprovalRequests[index].map((req, i) =>
                              <li key={`req-${i}`}>
                                <span>{req}</span>
                                {props.approvingRequest[req] ?
                                   <CircularProgress
                                    thickness={5}
                                    className={classes.progressWide} disableShrink /> :
                                  props.approvedList[index].toLowerCase() === req.toLowerCase() ?
                                  <Chip
                                    size="small"
                                    label="Approved"
                                    className={classes.chip}
                                    deleteIcon={<DoneIcon />} /> :
                                   <Button
                                   className={classes.approveBtn}
                                   onClick={() => props.approve(req, index)}>
                                     Approve
                                   </Button>
                                 }
                              </li>
                            )}
                        </ol> : props.approvedList[index] ?
                        props.approvedList[index].toLowerCase() === props.address.toLowerCase() ?
                        props.buyingBrick[index] ?
                          <CircularProgress thickness={5} className={classes.progress} disableShrink /> :
                          <Button
                          className={classes.buyBtn}
                          onClick={() => props.transferFrom(props.brickOwners[index],
                                                props.address,
                                                index,
                                                brick.price)}>
                            Buy Brick
                          </Button>
                          : props.joiningWaitlist.includes(index) ?
                          <CircularProgress thickness={5} className={classes.progress} disableShrink />
                          : brickApprovalRequests[index] &&
                          !brickApprovalRequests[index].includes(props.address.toLowerCase()) ?
                            <Button
                            className={classes.primaryBtn}
                            onClick={() => props.requestApproval(props.address, index)}>
                              Join Waitlist
                            </Button> :
                            <Chip
                            label="Awaiting approval"
                            className={classes.chip}
                            variant="default" /> : null
                      }
                    </div>)
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
        : <>
          <Skeleton />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
        </>}
    </div>
  )
}

export default ManageProperty;
