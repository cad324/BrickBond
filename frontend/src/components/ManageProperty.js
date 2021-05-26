import React, { useState, useEffect } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
import {Helmet} from "react-helmet";
import {styles} from './ManageProperty.Style';
import {
  useParams
} from "react-router-dom";

import PayInvestors from './PayInvestors';
import FileUpload from './FileUpload';
import { setPage } from '../features/page/currentPageSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(styles);

const ManageProperty = (props) => {

  const dispatch = useDispatch();

  const [stake, setStake] = useState(0);
  const [price, setPrice] = useState(0);
  const [brickApprovalRequests, setBrickApprovalRequests] = useState([]);

  const classes = useStyles();

  const createBrick = () => {
    props.createBrick(slug, stake, price);
    setStake(0);
    setPrice(0);
  }

  const payInvestors = (payout) => {
    props.payInvestors(payout, slug);
  }

  const { slug } = useParams();

  useEffect(() => {
    dispatch(setPage('/properties'));
  }, []);

  useEffect(() => {
    props.getAddress();
    props.updateBrickApprovalRequests();
    props.getBricks(slug);
    props.getAllProperties();
    props.setIsPropertyOwner(slug);
    console.log('[APPROVED LIST]', props.approvedList)
  }, [props.createdBrick, props.approvedTransfer, props.boughtBrick,
    props.requestApprovalSent]);

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
          <>
            <FileUpload property={slug} />
            <div className={classes.ownerPanel}>
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
                    disabled={stake * price <= 0}
                    className={classes.primaryBtn}
                    variant="contained">
                  <Typography variant="caption" component="p">Create Brick</Typography>
                </Button> : <CircularProgress thickness={5} className={classes.progress} disableShrink />}
              </CardContent>
            </Card>
            {props.bricks.length ?
              <PayInvestors
                payingInvestors={props.payingInvestors}
                payInvestors={(payout) => payInvestors(payout)}/> : null}
          </div></> : null}
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
                      {props.brickOwners[index]
                        && props.address.toLowerCase() === props.brickOwners[index].toLowerCase()
                        && props.brickApprovalRequests[index] ?
                        <>
                          <Chip
                            size="small"
                            label="Owned"
                            className={classes.chip} />
                          <ol className={classes.approveList}>
                            {props.brickApprovalRequests[index].length ?
                              <Typography variant="h6">Waitlist</Typography> : null
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
                          </ol>
                        </> : props.approvedList[index] ?
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
                          <CircularProgress thickness={5} className={classes.progress}
                          disableShrink />
                          : brickApprovalRequests[index] &&
                          !brickApprovalRequests[index].includes(props.address.toLowerCase()) ?
                            <Button
                            className={classes.approveBtn}
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
