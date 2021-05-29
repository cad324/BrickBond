# BrickBonds 

To learn about the development journey, read [design-journey](documents/design-journey.md)
## Overview

BrickBonds is a dApp built on the Ethereum network. Conceptually, it allows a property owner to register their rental properties on the network, and create tokens (called BRICKS) representing a fraction of the property.

Each BRICK (tokenized fraction of a rental property) has a stake (percentage of ownership) and price (face value in the initial sale of the tokens).

The contract allows for the purchase of each brick from one token holder to another, without affecting the price of other bricks. Additional, the property owner (or issuer) can pay dividends to their investors from the dashboard by simply entering the total payout amount. 

Ultimately the issuer of the tokens can mature the bricks by paying back the face value to the holders (just like traditional bonds!).

## Requirements

- Install Node 14.

- Add [MetaMask](https://metamask.io/) extension to Chrome browser and create an account.

- Install the latest version of [Ganache CLI](https://docs.nethereum.com/en/latest/ethereum-and-clients/ganache-cli/) to create test Ethereum accounts.

- Install [Remix IDE](https://github.com/ethereum/remix-desktop/releases) to compile and deploy smart contracts locally.


## Usage

- Run ```npm install``` from project directory
  
- Navigate to `/frontend` and run ```npm install```

- In your terminal, run the command `ganache-cli`. You should see a 12 word mnemonic. Save this. 

- Open your MetaMask extension and click 'Import using seed phrase'. Use the 12 word mnemonic from the previous step to import the wallet. Connect Metamask to the network at `http://127.0.0.1:8545` or `http://localhost:8545`.

- Open the project in the Remix IDE and compile `BrickOwnership.sol` using Solidity 0.8.0.

- In the Deploy panel, select the Web3 Provider environment. The Web3 Provider endpoint should be pointing at `http://127.0.0.1:8545` by default. Deploy the compiled `BrickOwnership.sol` contract.

- When the contract is deployed, copy the contract address. Update the address in `App.js` for the `BrickBond` value:

```
const BrickBond = new web3.eth.Contract(
  ContractABI,
  "[YOUR_CONTRACT_ADDRESS_HERE]"
);
```

- Finally, navigate to `/frontend` and run `npm start`. The project should run at http://localhost:3000 by default.
  
--- 

## Real-world Advantages

- Lower administrative costs since the contracts are self-executing (although it does not replace lawyers).
  
-  Real estate assets, typically very illiquid, can be much more liquid.

- One master document (distributed ledger).

## Pitfalls

- Real estate and smart contracts are incredibly complex to weave together in the real world from a legal standpoint. Several lawyers, blockchain experts, mortgage brokers, etc. would be require for something like this to be applicable.

- Real estate investors/professionals are notoriously slow to adopt new technology.