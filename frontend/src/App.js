import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from "web3";
import { ContractABI } from "./ContractABI";
import { styles } from './components/App.Style.js';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import RegisterProperties from './components/RegisterProperties';
import AppLayout from './components/AppLayout';
import ManageProperty from './components/ManageProperty';
import BrowseProperties from './components/BrowseProperties';
import AccountSettings from './components/AccountSettings';
import Home from './components/Home';
import { useSelector, useDispatch } from 'react-redux';
import { addresser } from './features/account/addresserSlice';
import { setBalance } from './features/account/balanceSlice';
import { myPropertiesLoader } from './features/property/registeredPropertiesSlice';
import { allPropertiesLoader } from './features/property/allPropertiesSlice';
import { allBricksLoader } from './features/brick/allBricksSlice';

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];
web3.eth.net.isListening()
   .then((e) => console.log('[Web3 Connected]', e))
   .catch(e => console.log('[Web3 Connection]'+ e));

const BrickBond = new web3.eth.Contract(
  ContractABI,
  "0xc20873e197C28c46946b3B85E66DCD71C2E8E223" //New contract address here
);


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(styles);

const App = () => {

  /*Store variables*/
  const address = useSelector((state) => state.addresser.address);
  const balance = useSelector((state) => state.setBalance.brickBalance);
  const allStoreProperties = useSelector((state) => state.allPropertiesLoader.allProperties);
  const allstoreBricks = useSelector((state) => state.allBricksLoader.bricks);
  const myPropertyIds = useSelector((state) => state.myPropertiesLoader.properties);
  const dispatch = useDispatch();
 
  const [brickBalance, setBrickBalance] = useState(0);
  const [myAddress, setMyAddress] = useState(0);
  const [properties, setProperties] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loadingRegistration, setLoadingRegistration] = useState(false);
  const [loadingBrickDetails, setLoadingBrickDetails] = useState(false);
  const [creatingBrick, setCreatingBrick] = useState(false);
  const [brickDetails, setBrickDetails] = useState([]);
  const [propertyBricks, setPropertyBricks] = useState([]);
  const [createdBrick, setCreatedBrick] = useState([false, ""]);
  const [allProperties, setAllProperties] = useState([]);
  const [allBricks, setAllBricks] = useState([]);
  const [brickApprovalRequests, setBrickApprovalRequests] = useState([]);
  const [propertyBrickCount, setPropertyBrickCount] = useState([]);
  const [brickOwners, setBrickOwners] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [isPropertyOwner, setIsPropertyOwner] = useState(false);
  const [joiningWaitlist, setJoiningWaitlist] = useState([]);
  const [approvingRequest, setApprovingRequest] = useState([]);
  const [requestApprovalSent, setRequestApprovalSent] = useState(false);
  const [approvedTransfer, setApprovedTransfer] = useState(false);
  const [boughtBrick, setBoughtBrick] = useState(false);
  const [buyingBrick, setBuyingBrick] = useState([]);
  const [payingInvestors, setPayingInvestors] = useState(false);
  const [paidInvestors, setPaidInvestors] = useState([false, ""]);
  const [registeredProperty, setRegisteredProperty] = useState([false, ""]);

  const ETH_EX = 1000000000000000000/1500;

  useEffect(() => {
    properties.map(id =>
      loadPropertyDetails(id)
    );
    console.log('[PROPERTIES UPDATED]');
  }, [properties]);

  useEffect(() => {
    getAddress();
    BrickBond
      .methods
      .getAllProperties()
      .call()
      .then(res => {
        setAllProperties(res);
        dispatch(allPropertiesLoader(res));
      });
    BrickBond
      .methods
      .getAllBricks()
      .call()
      .then(res => setAllBricks(res));
  }, [])

  useEffect(() => {
    BrickBond
      .methods
      .getBrickOwners()
      .call()
      .then(res => {setBrickOwners(res); console.log('brick owners', res)});
    allBricks.map((brick, index) => {
      BrickBond
        .methods
        .getBrickRequests(index)
        .call()
        .then(res => {
          let brickRequests = brickApprovalRequests;
          brickRequests[index] = res;
          setBrickApprovalRequests(brickRequests);
          console.log('[APPROVAL REQUESTS]' , brickApprovalRequests)
        })
    });
  }, [allBricks, myAddress]);

  useEffect(() => {
    allBricks.map((brick, index) => {
      BrickBond.methods
        .getApproved(index)
        .call()
        .then(res => {
          let approvals = approvedList;
          approvals[index] = res;
          console.log('[APPROVED]', index, res)
          setApprovedList(approvals);
        })
    })
  }, [allBricks, loadingBrickDetails, myAddress])

  const getBalance = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await BrickBond.methods
      .balanceOf(account)
      .call()
      .then(res => {
        setBrickBalance(res);
        dispatch(setBalance(res));
      });
  }

  const getAddress = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setMyAddress(accounts[0]);
    getBalance();
    getPropertiesByAddress();
    dispatch(addresser(accounts[0]));
  }

  const getPropertiesByAddress = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await BrickBond.methods
      .getPropertiesByAddress(account)
      .call()
      .then(e => {
        setProperties(e);
        console.log('[Property IDs]', e);
        dispatch(myPropertiesLoader(e));
      });
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

  const registerProperty = async (street, city, province, zip) => {
    setLoadingRegistration(true);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const gas = await BrickBond
                        .methods
                        .registerProperty(account, street, city, province, zip)
                        .estimateGas();
    BrickBond.methods
      .registerProperty(account, street, city, province, zip)
      .send({
        from: account,
        gas: gas
      })
      .then((v) => {
        console.log(v);
        setLoadingRegistration(false);
        showPropertyRegistrationMessage("success");
        getPropertiesByAddress();
      }, (v) => {
        console.log("Cannot register property:", v, account);
        showPropertyRegistrationMessage("error");
        setLoadingRegistration(false);});
  }

  const createBrick = async (propertyId, stake, price) => {
    setCreatingBrick(true);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    try {
      BrickBond.methods
        .createBrick(propertyId, stake, price)
        .send({
          from: account,
          gas: 4712388
        })
        .then((res) => {
          console.log(res);
          setCreatingBrick(false);
          showBrickCreationMessage("success");
          getBricksByProperty(propertyId);
        }, (err) => {
            console.log("Cannot create brick", err);
            showBrickCreationMessage("error");
            setCreatingBrick(false);
          });
    } catch (err) {
      console.log('[CREATE BRICK]', err);
      setCreatingBrick(false);
    }
  }

  const getAllProperties = async () => {
    BrickBond
      .methods
      .getAllProperties()
      .call()
      .then(res => {
        setAllProperties(res);
        dispatch(allPropertiesLoader(res));
      });
  }

  const updateBrickApprovalRequests = async () => {
    BrickBond
      .methods
      .getBrickOwners()
      .call()
      .then(res => {setBrickOwners(res); console.log('brick owners', res)});
    allBricks.map((brick, index) => {
      BrickBond
        .methods
        .getBrickRequests(index)
        .call()
        .then(res => {
          let brickRequests = brickApprovalRequests;
          brickRequests[index] = res;
          setBrickApprovalRequests(brickRequests);
          console.log('[APPROVAL REQUESTS]' , brickApprovalRequests)
        })
      })
  }

  const getPropertyOwner = async (propertyId) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    BrickBond.methods
      .propertyToBuyer(propertyId)
      .call()
      .then(res => {
        let isOwner = res.toLowerCase() === account.toLowerCase();
        setIsPropertyOwner(isOwner);
      })
  }

  const payInvestors = async (payout, propertyId) => {
    setPayingInvestors(true);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const value = payout * ETH_EX;
    BrickBond.methods
      .payInvestors(propertyId)
      .send({
        from: account,
        value
      })
      .then(res => {
        console.log('[Paid investors]', res);
        setPayingInvestors(false);
        showPaidInvestorsMessage("success");
      }, (err) => {
        console.log('[Paying Investors failed]', err);
        setPayingInvestors(false);
        showPaidInvestorsMessage("error");
      })
  }

  const showBrickCreationMessage = (res) => {
    setCreatedBrick([true, res]);
    setTimeout(() => {
      setCreatedBrick([false, ""]);
    }, 5000);
  }

  const showPropertyRegistrationMessage = (res) => {
    setRegisteredProperty([true, res]);
    setTimeout(() => {
      setRegisteredProperty([false, ""]);
    }, 5000);
  }

  const showApprovalRequestMessage = (res) => {
    setRequestApprovalSent([true, res]);
    setTimeout(() => {
      setRequestApprovalSent([false, ""]);
    }, 5000);
  }

  const showApprovedTransferMessage = (res) => {
    setApprovedTransfer([true, res]);
    setTimeout(() => {
      setApprovedTransfer([false, ""]);
    }, 5000);
  }

  const showBrickBoughtMessage = (res) => {
    setBoughtBrick([true, res]);
    setTimeout(() => {
      setBoughtBrick([false, ""]);
    }, 5000);
  }

  const showPaidInvestorsMessage = (res) => {
    setPaidInvestors([true, res]);
    setTimeout(() => {
      setPaidInvestors([false, ""]);
    }, 5000);
  }

  const getBricksByProperty = async (id) => {
    setLoadingBrickDetails(true);
    try {
      BrickBond.methods
        .getBricksByProperty(id)
        .call()
        .then(res => {
          let tempPropertyBrick = propertyBricks;
          res.map(brickId => {
            tempPropertyBrick[brickId] = id;
          });
          loadBrickDetails(res);
          setPropertyBricks(tempPropertyBrick);
          let tempPropertyCount = propertyBrickCount;
          tempPropertyCount[id] = res.length;
          setPropertyBrickCount(tempPropertyCount);
        });
    } catch (err) {
      console.log('[Bricks by Property]', err);
      setLoadingBrickDetails(false);
    }
  }

  const getAllPropertyBricks = () => {
    properties.map(id => {
      getBricksByProperty(id);
    })
  }

  const getAllPropertyBrickCounts = async () => {
    allProperties.map((property, index) => {
      BrickBond.methods
        .getBricksByProperty(index)
        .call()
        .then(res => {
          let tempPropertyCount = propertyBrickCount;
          tempPropertyCount[index] = res.length;
          setPropertyBrickCount(tempPropertyCount);
          console.log(index, res, propertyBrickCount[index]);
        });
    })
  }

  const loadBrickDetails = async bricks => {
    let newDetails = [];
    if (bricks.length) {
      bricks.map(brick =>
        BrickBond.methods
                .bricks(brick)
                .call()
                .then(res => {
                  newDetails[brick] = res;
                  setBrickDetails(newDetails);
                  dispatch(allBricksLoader(JSON.stringify(newDetails)));
                  setLoadingBrickDetails(false);
                }, (err) => console.log('[LOAD BRICK DETAILS]', err))
      );
    } else {
      setBrickDetails([]);
      setLoadingBrickDetails(false);
    }
  }

  const requestApproval = (from, brickId) => {
    let pending = joiningWaitlist;
    pending.push(brickId);
    setJoiningWaitlist(pending);
    BrickBond.methods
      .requestApproval(brickId)
      .send({
        from: from
      })
      .then((res) => {
        console.log('[REQUEST APPROVAL]', res);
        let index = joiningWaitlist.indexOf(brickId);
        pending[index] = null;
        setJoiningWaitlist(pending);
        showApprovalRequestMessage("success");
        updateBrickApprovalRequests();
      }, (err) => {
          console.log('[REQUEST APPROVAL]');
          showApprovalRequestMessage("error");
        });
  }

  const approve = async (approved, brickId) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    let tempApprovingRequest = approvingRequest;
    tempApprovingRequest[approved] = true;
    setApprovingRequest(tempApprovingRequest);
    BrickBond.methods
      .approve(approved, brickId)
      .send({
        from: account
      })
      .then((res) => {
        console.log('[APPROVE]', res);
        tempApprovingRequest[approved] = false;
        setApprovingRequest(tempApprovingRequest);
        showApprovedTransferMessage("success");
        getApproved();
      }, (err) => {
          console.log('[APPROVE]', err);
          showApprovedTransferMessage("error");
        });
  }

  const getApproved = () => {
    allBricks.map((brick, index) => {
      BrickBond.methods
        .getApproved(index)
        .call()
        .then(res => {
          let approvals = approvedList;
          approvals[index] = res;
          console.log('[APPROVED]', index, res)
          setApprovedList(approvals);
        })
    })
  }

  const transferFrom = async (from, to, brickId, price) => {
    let tempBuyingBrick = buyingBrick;
    tempBuyingBrick[brickId] = true;
    setBuyingBrick(tempBuyingBrick);
    const value = price * ETH_EX * 1.02;
    BrickBond
      .methods
      .transferFrom(from, to, brickId)
      .send({
        from: from,
        value
      })
      .then((res) => {
        console.log('[TRANSFER FROM]', res);
        tempBuyingBrick[brickId] = false;
        setBuyingBrick(tempBuyingBrick);
        showBrickBoughtMessage("success");
      },
        (err) => {
          console.log('[TRANSFER FROM]', err);
          showBrickBoughtMessage("error");
        });
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
              registeredProperty={registeredProperty}
              loadingRegistration={loadingRegistration}
              properties={properties}
              propertyDetails={propertyDetails}
              registerProperty={(s,c,p,z) => registerProperty(s,c,p,z)} />
          } />
          <Route exact path="/settings" render={(props) => 
            <AccountSettings {...props} address={myAddress} />
          } />
          <Route exact path="/browse/properties" render={(props) =>
            <BrowseProperties
              {...props}
              getAllPropertyBrickCounts={() => getAllPropertyBrickCounts()}
              propertyBrickCount={propertyBrickCount}
              allProperties={allProperties} />
          } />
          <Route path="/property/:slug" render={(props) =>
            <ManageProperty
              {...props}
              propertyDetails={propertyDetails}
              creatingBrick={creatingBrick}
              loadingBrickDetails={loadingBrickDetails}
              joiningWaitlist={joiningWaitlist || []}
              getBricks={(id) => getBricksByProperty(id)}
              buyingBrick={buyingBrick}
              bricks={brickDetails}
              brickOwners={brickOwners}
              address={myAddress}
              approvingRequest={approvingRequest}
              approvedTransfer={approvedTransfer}
              boughtBrick={boughtBrick}
              getAddress={() => getAddress()}
              approvedList={approvedList}
              payInvestors={(payout, propertyId) => payInvestors(payout, propertyId)}
              payingInvestors={payingInvestors}
              transferFrom={(from, to, brickId, price) => transferFrom(from, to, brickId, price)}
              requestApproval={(from, brickId) => requestApproval(from, brickId)}
              brickApprovalRequests={brickApprovalRequests}
              updateBrickApprovalRequests={() => updateBrickApprovalRequests()}
              createdBrick={createdBrick}
              requestApprovalSent={requestApprovalSent}
              approve={(approved, brickId) => approve(approved, brickId)}
              allProperties={allProperties}
              getAllProperties={() => getAllProperties()}
              isPropertyOwner={isPropertyOwner}
              setIsPropertyOwner={(propertyId) => getPropertyOwner(propertyId)}
              createBrick={(id, stake, price) => createBrick(id, stake, price)} />
          } />
          <Route exact path="/" render={(props) =>
            <Home 
              address={address}
              balance={balance}
              propertyDetails={propertyDetails}
              properties={properties} 
              propertyBricks={propertyBricks}
              brickOwners={brickOwners}
              allBricks={allBricks}
              getAllPropertyBricks={() => getAllPropertyBricks()}
            />
          } />
        </Switch>
        <Snackbar open={createdBrick[0]} autoHideDuration={5000}>
          {createdBrick[1] === "success" ?
            <Alert severity="success">
              Brick creation successful!
            </Alert> : createdBrick[1] === "error" ?
            <Alert severity="error">
              Something went wrong. Please try again later.
            </Alert> : null
          }
        </Snackbar>
        <Snackbar open={requestApprovalSent[0]} autoHideDuration={5000}>
          {requestApprovalSent[1] === "success" ?
            <Alert severity="success">
              Joined waitlist!
            </Alert> : requestApprovalSent[1] === "error" ?
            <Alert severity="error">
              Something went wrong. Please try again later.
            </Alert> : null
          }
        </Snackbar>
        <Snackbar open={approvedTransfer[0]} autoHideDuration={5000}>
          {approvedTransfer[1] === "success" ?
            <Alert severity="success">
              Successfully approved transfer!
            </Alert> : approvedTransfer[1] === "error" ?
            <Alert severity="error">
              Something went wrong. Please try again later.
            </Alert> : null
          }
        </Snackbar>
        <Snackbar open={boughtBrick[0]} autoHideDuration={5000}>
          {boughtBrick[1] === "success" ?
            <Alert severity="success">
              Successfully purchased brick!
            </Alert> : boughtBrick[1] === "error" ?
            <Alert severity="error">
              Something went wrong. Please try again later.
            </Alert> : null
          }
        </Snackbar>
        <Snackbar open={registeredProperty[0]} autoHideDuration={5000}>
          {registeredProperty[1] === "success" ?
            <Alert severity="success">
              Property registration successful!
            </Alert> : registeredProperty[1] === "error" ?
            <Alert severity="error">
              Something went wrong registering property. Please try again later.
            </Alert> : null
          }
        </Snackbar>
        <Snackbar open={paidInvestors[0]} autoHideDuration={5000}>
          {paidInvestors[1] === "success" ?
            <Alert severity="success">
              Successfully paid investors
            </Alert> : paidInvestors[1] === "error" ?
            <Alert severity="error">
              Could not pay investors. Please try again later.
            </Alert> : null
          }
        </Snackbar>
      </div>
    </Router>
  );
}

export default App;
