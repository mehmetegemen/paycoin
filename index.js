// This is an example program which flows imperatively
// to show you what happens in each step in a blockchain
// node.

const createWallets = require("./createWallets");
const {
  UTXOs,
  findTransaction,
  removeTransaction,
  addTransaction
} = require("./UTXO");
const block = require("./block");
const transaction = require("./transaction");
