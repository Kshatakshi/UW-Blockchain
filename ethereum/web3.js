const Web3 = require("web3");
let web3;

if (typeof window !== "undefined" && window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/af02c9ffd6fc4b81a6e34961b8263c77"
  );

  web3 = new Web3(provider);
}

export default web3;