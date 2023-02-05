// https://eth-goerli.g.alchemy.com/v2/2-Q6iJF99UrJGAKCTfOswJHvIYTuMfA6

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [0x9a3B83f5406DE12301EfE882FCA0ba5053dA923c]
    }
  }
};


