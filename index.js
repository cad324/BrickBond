const Web3 = require('web3');

const fs = require('fs');
const solc = require('solc');

const content = fs.readFileSync('contracts/BrickOwnership.sol', 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
        'contracts/BrickOwnership.sol': {
            content
        }
    },
    settings: {
        outputSelection: {
          '*': {
            '*': ['*']
          }
        }
      }
}

const output = JSON.parse(solc.compile(JSON.stringify(input)));

console.log(output);

// Set up a provider
const provider = new Web3.providers.HttpProvider("http://localhost:8545");

// Connect to the network and save it as "web3"
const web3 = new Web3(provider);