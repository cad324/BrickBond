import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from "web3";
import { ContractABI } from "./ContractABI";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from "react-router-dom";

import RegisterProperties from './components/RegisterProperties';
import AppLayout from './components/AppLayout';
import ManageProperty from './components/ManageProperty';

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];
web3.eth.net.isListening()
   .then((e) => console.log('[Web3 Connected]', e))
   .catch(e => console.log('[Web3 Connection]'+ e));

const BrickBond = new web3.eth.Contract(
  ContractABI,
  "0xaa7f3166eeCffE8eb096D5D17A6cb74e33789f4d"
);

const useStyles = makeStyles((theme) => ({
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
  root: {
    display: 'flex',
    fontFamily: 'Poppins'
  },
  welcome: {
    marginBottom: theme.spacing(2),
    color: '#535353'
  },
  primaryBtn: {
    backgroundColor: '#2F4858',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#3c5783'
    }
  },
  propertiesList: {
    overflowY: 'scroll',
    maxHeight: 150,
    paddingRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600'
  },
  card: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardActions: {
    '& a': {
      textDecoration: 'none',
      fontSize: theme.spacing(1.5),
      color: '#2F4858'
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  balance: {
    backgroundColor: 'rgba(0, 81, 133, 0.5)',
    padding: `${theme.spacing(0.25)}px ${theme.spacing(1)}px`,
    borderRadius: theme.spacing(1.25),
    color: 'white',
    fontSize: theme.spacing(1.5)
  }
}));

const App = () => {

  const [brickBalance, setBrickBalance] = useState(0);
  const [myAddress, setMyAddress] = useState(0);
  const [properties, setProperties] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loadingRegistration, setLoadingRegistration] = useState(false);
  const [creatingBrick, setCreatingBrick] = useState(false);

  useEffect(() => {
    getBalance();
    getAddress();
    getPropertiesByAddress();
    properties.map(id =>
      loadPropertyDetails(id)
    );
  });

  const getBalance = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await BrickBond.methods
      .balanceOf(account)
      .call()
      .then(res => setBrickBalance(res));
  }

  const getAddress = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setMyAddress(accounts[0]);
  }

  const getPropertiesByAddress = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await BrickBond.methods
      .getPropertiesByAddress(account)
      .call()
      .then(e => setProperties(e));
  }

  const loadPropertyDetails = async e => {
    await BrickBond.methods
            .properties(e)
            .call()
            .then(res => {
              let newDetails = propertyDetails;
              newDetails[e] = res;
              setPropertyDetails(newDetails);
            });
  }

  const registerProperty = async (myAddress, street, city, province, zip) => {
    setLoadingRegistration(true);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const gas = await BrickBond
                        .methods
                        .registerProperty(myAddress, street, city, province, zip)
                        .estimateGas();
    BrickBond.methods
      .registerProperty(myAddress, street, city, province, zip)
      .send({
        from: account,
        gas: gas
      })
      .then((v) => {
        console.log(v);
        setLoadingRegistration(false);
      }, (v) => {console.log("Cannot register property:", v, account); setLoadingRegistration(false);});
  }

  const createBrick = async (propertyId, stake, price) => {
    setCreatingBrick(true);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const gas = await BrickBond
                        .methods
                        .createBrick(propertyId, stake, price)
                        .estimateGas();
    BrickBond.methods
      .createBrick(propertyId, stake, price)
      .send({
        from: account,
        gas: gas
      })
      .then((res) => {
        console.log(res);
        setCreatingBrick(false);
      }, err => {console.log("Cannot create brick", err, account); setCreatingBrick(false)});
  }

  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <AppLayout />
        <Switch>
          <Route exact path="/properties" render={(props) =>
            <RegisterProperties
              {...props}
              address={myAddress}
              loadingRegistration={loadingRegistration}
              properties={properties}
              propertyDetails={propertyDetails}
              registerProperty={(a,s,c,p,z) => registerProperty(a,s,c,p,z)} />
          } />
          <Route path="/property/" render={(props) =>
            <ManageProperty
              {...props}
              propertyDetails={propertyDetails}
              creatingBrick={creatingBrick}
              createBrick={(id, stake, price) => createBrick(id, stake, price)} />
          } />
          <Route exact path="/" render={(props) =>
            <main className={classes.content}>
              <Toolbar/>
              <Typography variant="body2" component="p" className={classes.welcome}>
                Here's what's happening with your account today.
              </Typography>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                    ACCOUNT INFO
                  </Typography>
                  <Typography variant="body2" component="p">
                    My address: {myAddress}
                  </Typography>
                  <Typography variant="body2" component="p">
                    BRICK Balance: <span className={classes.balance}>{brickBalance} BRICK</span>
                  </Typography>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                  MY PROPERTIES
                </Typography>
                  <div className={classes.propertiesList}>
                    {properties.map(property => {
                        return <p key={`p-${property}`}>{
                            propertyDetails[property] ?
                              `${propertyDetails[property]["street"]},
                              ${propertyDetails[property]["city"]},
                               ${propertyDetails[property]["province"]}
                              ${propertyDetails[property]["zip_code"]}`
                              : `Property # ${property}`
                          }</p>
                      }
                    )}
                  </div>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button size="small"><Link to="/properties">See More</Link></Button>
                </CardActions>
              </Card>
              <br />
            </main>
          } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
