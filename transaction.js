const { doDoubleSHA } = require("./utilities");
const { sign, publicKeyCreate } = require("secp256k1");

// This is a simplified version of the transaction system
// as every other thing in this project for pedagogic purposes
// It supports transactions with only one input and one output
// Real implementation is with raw bytes and there
// are other additional bytes to indicate some
// properties of the transaction. If you are
// curious you can check:
// https://bitcoin.stackexchange.com/questions/3374/how-to-redeem-a-basic-tx


class Transaction {
  constructor({ input, output }) {
    this.hash = null;
    // I don't check errors, this is a mental model
    const { prev_tx, privateKey } = input;
    const { value, publicKeyHash } = output;
    // We take the first input of a previous transaction(tx)
    // and scriptSig as a puzzle piece to be appended in front
    // of scriptPubKey of the output in future. This is called
    // locking/unlocking a transaction. You should definetely
    // watch these:
    // https://www.youtube.com/watch?v=aaTchHpdpIo
    // https://www.youtube.com/watch?v=ir4dDCJhdB4
    // It's a great channel, we will use it in other places too
    this.input = {
      prev_tx,
      index: 0
    }
    this.output = {
      value,
      scriptPubKey
    }
    this.hashTransaction();

    // Script part containing signature and public key
    // shouldn't be included in hashed information
    // so it is defined after hashing the block.
    // scriptSig in format "<signature> <publicKey>"
    this.input.scriptSig = `${sign(this.hash, privateKey)} ${publicKeyCreate(privateKey)}`;
  }

  hashTransaction() {
    this.hash = doDoubleSHA(JSON.stringify(this));
  }
}

module.exports = Transaction;