import React, { useEffect, useState } from 'react'
import './App.css';
import Web3 from "web3";
import { ContractABI } from "./ContractABI";

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];
web3.eth.net.isListening()
   .then((e) => console.log('[Web3 Connected]', e))
   .catch(e => console.log('[Web3 Connection]'+ e));

const BrickBond = new web3.eth.Contract(
  ContractABI,
  "0xaa7f3166eeCffE8eb096D5D17A6cb74e33789f4d"
);

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

  return (
    <div className="App">
      <header className="App-header">
        <p>My address: {myAddress}</p>
        <p>BRICK Balance: {brickBalance} BRICK</p>
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
        {loadingRegistration ? <p>registering...</p> : <button onClick={registerProperty}>
          Register Property
        </button>}
        <br />
        <h2>My Properties</h2>
        <ul>
          {properties.map(property => {
              BrickBond.methods.properties(property).call().then((res) => {return res});
              return <li key={`p-${property}`}>{
                  propertyDetails[property] ?
                    `${propertyDetails[property]["street"]},
                    ${propertyDetails[property]["city"]},
                     ${propertyDetails[property]["province"]}
                    ${propertyDetails[property]["zip_code"]}`
                    : `Property # ${property}`
                }</li>
            }
          )}
        </ul>
      </header>
    </div>
  );
}

export default App;
