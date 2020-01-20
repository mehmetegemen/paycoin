// UTXO means "Unspent Transaction Output"
// Nodes are usually keeping track of all unspent
// transactions in RAM to find them later quickly.
// There is no traversal of blockchain to learn
// the total coins of an address. Let's say you are
// "Malice" and you have 5 BTC. You want to send 4 BTC
// to "Blob"(I am bored of naming the people in this
// example Alice and Bob). You should send 4 BTC to Blob
// and then you should send remaining 1 BTC to yourself
// again. Doing so we don't have to traverse all blockchain
// to learn Malice's balance since you sent the remaining
// to yourself we now how much remained in your balance
// from the last transaction. Actually transactions because
// other people can send you BTC too so we keep track all
// of them in a set.
let UTXOs = [];

const findTransaction = hash => {
  return UTXOs.filter(UTXO => UTXO.hash === hash)[0];
};

const removeTransaction = hash => {
  const transaction = findTransaction(hash);
  const indexOfTransaction = UTXOs.indexOf(transaction);
  // This a good trick from three.js source code
  // Instead of using array.slice() which is slow,
  // we move item to be removed to the last position
  // and last item to removed item's position.
  // Then we .pop() the array and remove new last item.
  // This is way faster if array hasn't to be ordered.
  UTXOs[indexOfTransaction] = UTXOs[UTXOs.length - 1];
  UTXOs.pop();
};

const addTransaction = transaction => UTXOs.push(transaction);

// UTXOs array is persistent across modules that imported
// this module
module.exports = {
  UTXOs,
  removeTransaction,
  findTransaction,
  addTransaction
};
