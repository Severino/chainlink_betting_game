require('dotenv').config()
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle")
require('hardhat-abi-exporter');


const accounts = [`0x${process.env.PRIVATE_KEY}`]

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.6",
  defaultNetwork:"localnet",
  networks: {
    localnet: {
      url: `http://localhost:9500`,
      accounts
    },
    testnet: {
      url: `https://api.s0.b.hmny.io`,
      accounts
    },
    mainnet: {
      url: `https://api.s0.t.hmny.io`,
      accounts
    }
  },
  paths:{
    sources: "./src/contract"
  },
  abiExporter: {
    clear:true
  }
};
