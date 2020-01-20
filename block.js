const { version } = require("./config");
const createMerkleTree = require("./createMerkleTree");
const { doDoubleSHA } = require("./utilities");

class Block {
  constructor({
    height,
    block_index,
    size,
    transactions,
    relayedBy,
    previousBlock,
    target
  }) {
    this.version = version;
    this.target = target;
    this.size = size;
    this.block_index = block_index;
    this.height = height;
    this.relayedBy = relayedBy;
    this.previousBlock = previousBlock;
    this.nonce = 0;
    // We use rest/spread(...) operator in an array
    // because working with immutable arrays/objects
    // is a good practice. If you assign a variable
    // which contains an array to another variable
    // it won't copy the array, it will copy the reference.
    // So if you do [...array] you will create a new array.
    this.mrkl_root = createMerkleTree([...transactions]),
    // Number of transactions(txs)
    this.n_tx = inputs.length + outputs.length;
    // Transactions in the block
    this.tx = [...transactions];
    this.time = 0;
  }

  hashBlock() {
    return doDoubleSHA(this);
  }

  mineBlock() {
    // Block target is a hex value which is also a number.
    // Any sha256 hash is a number. It's harder to find
    // a sha256 hash number lower than low targets.
    const currentTarget = Number(`0x${this.target}`);
    // But hash of a constant value is also constant
    // How can we change the hash value of a block with
    // constant information? We increment nonce, which
    // means "number used only once".
    let currentBlockHash = hashBlock();
    // Type cast to number from hex string
    // 0x means number is a hex number
    while (Number(`0x${currentBlockHash}`) > currentTarget) {
      this.nonce++;
      currentBlockHash = hashBlock();
    }
    // Time of finishing mining in timestamps
    this.time = +new Date();
    console.log("mined");
  }
}

module.exports = Block;
