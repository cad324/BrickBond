import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import PropertiesList from './PropertiesList';

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
  }
}));

const RegisterProperty = (props) => {

  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const registerProperty = () => {
    props.registerProperty(props.address, street, city, province, zip);
    setStreet("");
    setProvince("");
    setCity("");
    setZip("")
  }

  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Toolbar/>
      <PropertiesList properties={props.properties} propertyDetails={props.propertyDetails} />
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
            ADD PROPERTY
          </Typography>
          <form className={classes.formCtr}>
            <label>
              <span>{`Street: `}</span>
              <input
                type="text"
                name="street"
                value={street}
                onChange={e => setStreet(e.target.value)}
              />
            </label>
            <label>
              <span>{`City: `}</span>
              <input
                type="text"
                name="city"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </label>
            <label>
              <span>{`Province: `}</span>
              <input
                type="text"
                name="province"
                value={province}
                onChange={e => setProvince(e.target.value)}
              />
            </label>
            <label>
              <span>{`Zip code: `}</span>
              <input
                type="text"
                name="zip"
                value={zip}
                onChange={e => setZip(e.target.value)}
              />
            </label>
          </form>
          {props.loadingRegistration ? <p>registering...</p> :
            <Button onClick={registerProperty} size="small" className={classes.primaryBtn} variant="contained">
              <Typography variant="caption" component="p">Register Property</Typography>
            </Button>}
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterProperty;
