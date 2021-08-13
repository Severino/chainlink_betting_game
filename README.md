# A Decentralized Betting Game powered by Harmony's VRF Function

**This is a developer example: Use on local-/testnet only. Don't use real funds with this application!**

This example was forked from:
https://github.com/dappuniversity/chainlink_betting_game

### 🔧 Project Diagram
![Project workflow](https://i.gyazo.com/0d76efbda6fce78509eabb1f68c928da.png)


## Requirements

+ NodeJS
+ Harmony Localnet
+ (optional) yarn (replace 'yarn' with 'npm' if you want to use npm as package manager)


## Setup

### Prepare Localnet

1. Start Harmony Localnet
2. Create Account and provide it with funds

### Setup Project

Clone the repo and initialize it with:

```
yarn install
```

Rename ".env.example" to ".env" and add your private key in here.


Deploy the smart contract:
```
npm run deploy
```

Add the deployed contract to the 'App.js':
```javascript
/* App.js */
const HarmonyLocalnet = {
  rpc: "http://localhost:9500",
  chainId: 1666700000,
  ws: "ws://localhost:9800",
  contract_address: // ENTER YOUR CONTRACT HERE
}
```

Run frontend app 

```
npm run start
```

Use metamask to send initial funds to the contract address.
You can only bet as high, as the contract has funding!

**Congratiulation: You have set up the application successfully and can start
betting. Have Fun!**

## Test

Test the solidity code by running:
```
npm run test
```

## Known Issues

+ Currently the app doesn't receive events from the contract.