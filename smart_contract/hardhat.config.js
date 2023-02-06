// https://eth-goerli.g.alchemy.com/v2/2-Q6iJF99UrJGAKCTfOswJHvIYTuMfA6

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_API_KEY = "2-Q6iJF99UrJGAKCTfOswJHvIYTuMfA6";

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = "6942f624286f02dade0ef019d58b4063f52f23f994db64484d4290feb37e6977"

module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};


