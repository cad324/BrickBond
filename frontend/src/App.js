import React, { useEffect, useState } from 'react'
import './App.css';
import Web3 from "web3";
import { ContractABI } from "./ContractABI";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PeopleIcon from '@material-ui/icons/People';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];
web3.eth.net.isListening()
   .then((e) => console.log('[Web3 Connected]', e))
   .catch(e => console.log('[Web3 Connection]'+ e));

const BrickBond = new web3.eth.Contract(
  ContractABI,
  "0xaa7f3166eeCffE8eb096D5D17A6cb74e33789f4d"
);

const drawerWidth = 240;

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
  appBar: {
      backgroundColor: '#950004',
      zIndex: theme.zIndex.drawer + 1
  },
  primaryBtn: {
    backgroundColor: '#2F4858',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#3c5783'
    }
  },
  bottomItem: {
    position: "fixed",
    bottom: 0,
    paddingBottom: 10,
    width: drawerWidth
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
    display:'inline-block',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

const App = () => {

  const [brickBalance, setBrickBalance] = useState(0);
  const [myAddress, setMyAddress] = useState("");
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [properties, setProperties] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loadingRegistration, setLoadingRegistration] = useState(false);

  useEffect(() => {
    getBalance();
    getAddress();
    getPropertiesByAddress();
    properties.map(id => {
      loadPropertyDetails(id);
    });
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

  const registerProperty = async e => {
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
        setStreet("");
        setCity("");
        setProvince("");
        setZip("");
        setLoadingRegistration(false);
      }, (v) => {console.log("Cannot register property:", v, account); setLoadingRegistration(false);});
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar elevation={1} className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            BrickBonds
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {[['Home', <HomeIcon/>],
            ['Properties', <LocationCityIcon/>],
            ['Investors', <PeopleIcon/>],
            ['Analytics', <TimelineIcon/>]].map((item, index) => (
              <ListItem button key={item[0]}>
                <ListItemIcon>{item[1]}</ListItemIcon>
                <ListItemText primary={item[0]} />
              </ListItem>
            ))}
            <div className={classes.bottomItem}>
              <Divider />
              <ListItem button key={'settings'}>
                <ListItemIcon>{<SettingsIcon/>}</ListItemIcon>
                <ListItemText primary={'Settings'} />
              </ListItem>
            </div>
          </List>
        </div>
      </Drawer>
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
              BRICK Balance: {brickBalance} BRICK
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">See More</Button>
          </CardActions>
        </Card>
        <Card className={classes.card}>
          <CardContent>
          <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
            MY PROPERTIES
          </Typography>
            <div className={classes.propertiesList}>
              {properties.map(property => {
                  BrickBond.methods.properties(property).call().then((res) => {return res});
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
          <CardActions>
            <Button size="small">See More</Button>
          </CardActions>
        </Card>
        <form>
          <label>
            Street:
            <input
              type="text"
              name="street"
              value={street}
              onChange={e => setStreet(e.target.value)}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <label>
            Province:
            <input
              type="text"
              name="province"
              value={province}
              onChange={e => setProvince(e.target.value)}
            />
          </label>
          <label>
            Zip code:
            <input
              type="text"
              name="zip"
              value={zip}
              onChange={e => setZip(e.target.value)}
            />
          </label>
        </form>
        {loadingRegistration ? <p>registering...</p> :
          <Button onClick={registerProperty} size="small" className={classes.primaryBtn} variant="contained">
            <Typography variant="body1" component="p">Register Property</Typography>
          </Button>}
        <br />
      </main>
    </div>
  );
}

export default App;
