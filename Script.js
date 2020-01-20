const { createHash } = require("crypto");
const { STACK_ITEMS_NOT_EQUAL_ERROR, NOT_ENOUGH_STACK_ITEM_ERROR } = require("./errors");
const { sign, verify } = require("secp256k1");

class Stack {
  constructor({transactionHash, script}) {
    this.stack = [];
    this.transactionHash = transactionHash;
    // Provided script is something like "OP_DUP OP_HASH160 ..."
    // so they are spaced and can be splitted to an array.
    this.script = script.split(" ");
    for (const command of this.script) {
      // Check if splitted individual command matched with
      // a function variable name in this class.
      // If so, run the command. If not so, add it to the
      // stack as a string value.
      // We defined our methods in this class as a variable
      // with arrow function instead of declaring traditionally.
      // It allowed us to bind classes' methods to "this".
      if (this.hasOwnProperty(command)) this[command]();
      else this.addToStack(command);
    }
    return this.stack;
  }

  OP_DUP = (obj) => {
    this.stackIsBiggerThan(0);
    const lastItem = this.stack.pop();
    this.stack.push(lastItem);
    this.stack.push(lastItem);
  }
  
  OP_EQUALVERIFY = () => {
    this.stackIsBiggerThan(1);
    // .pop() removes the last item of an array
    // and returns it. So we remove one after
    // another and return them here.
    const lastItem = this.stack.pop();
    const beforeLastItem = this.stack.pop();
    if(lastItem !== beforeLastItem) throw STACK_ITEMS_NOT_EQUAL_ERROR;
  }

  OP_CHECKSIG = () => {
    this.stackIsBiggerThan(1);
    const pubKey = this.stack.pop();
    const signature = this.stack.pop();
    const verified = verify(this.transactionHash, signature, pubKey);
    if (!verified) this.addToStack(signature).addToStack(pubKey);
  }

  OP_HASH160 = () => {
    this.stackIsBiggerThan(0);
    const lastItem = this.stack.pop();
    const itemHash = createHash("ripemd160")
      .update(
        createHash("sha256")
          .update(JSON.stringify(lastItem))
          .digest("hex")
      )
      .digest("hex");
    this.stack.push(itemHash);
  }

  addToStack(item) {
    this.stack.push(item);
    return this;
  }
  stackIsBiggerThan(num) {
    if(!this.stack.length > num) throw NOT_ENOUGH_STACK_ITEM_ERROR;
  }
}

module.exports = Stack;