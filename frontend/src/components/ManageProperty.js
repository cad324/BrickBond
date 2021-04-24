import React, { useEffect, useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';

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
  title: {
    fontWeight: '600',
    fontSize: theme.spacing(2.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const ManageProperty = (props) => {

  const [stake, setStake] = useState(0);
  const [price, setPrice] = useState(0);

  const propertyId = props.location.pathname.split("/")[2];

  const classes = useStyles();

  const createBrick = () => {
    props.createBrick(propertyId, stake, price);
    setStake(0);
    setPrice(0);
  }

  return (
    <div className={classes.content}>
      <Toolbar/>
      <button onClick={props.history.goBack}>{'< Back'}</button>
      <div className={classes.title}>{`
        ${props.propertyDetails[propertyId]["street"]},
         ${props.propertyDetails[propertyId]["city"]},
          ${props.propertyDetails[propertyId]["province"]}
           ${props.propertyDetails[propertyId]["zip_code"]}
      `}</div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
            Create Brick
          </Typography>
          <form className={classes.formCtr}>
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
          </Button> : <p>Creating brick...</p>}
        </CardContent>
      </Card>
    </div>
  )
}

export default ManageProperty;
