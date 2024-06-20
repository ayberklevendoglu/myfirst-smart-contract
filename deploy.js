const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "fun survey trash melody cruel execute gather risk craft effort lecture balance",
  "https://sepolia.infura.io/v3/0738f2e69fae4819afaa2cb7f31046e8"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("deploy accounts", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("contract deployed address", result.options.address);
  provider.engine.stop();
};
deploy();
