const { createHash } = require("crypto");
const { doDoubleSHA } = require("./utilities");

const hashPairs = (item, otherItem) => {
  let mergedHash = doDoubleSHA(item);
  if (otherItem) mergedHash += doDoubleSHA(otherItem);
  mergedHash = doDoubleSHA(mergedHash);
  return mergedHash;
};

const createMerkleTree = (tree, index) => {
  if (tree.length < 2 && index === 0)
    throw Error("Empty transaction arrays passed");
  if (index === 0) {
    let hashedTree;
    // First step in merkle tree generation is hashing each
    // item without reducing the items amount by half
    hashedTree = tree.map(item => doDoubleSHA(item));
    // Initiate tree items halving
    return createMerkleTree(hashedTree, 1);
  } else {
    if (tree.length === 2) {
      // Top layer of tree just before root always has
      // 2 items. If tree has 2 items it means we are at
      // the last stop
      return hashPairs(tree[0], tree[1]);
    } else {
      let condensedTree = [];
      // E.g. Tree has 9 elements, then iterationCount is
      // 1 + ((9 - 1) / 2) = 5. 1 is remainder of a division
      // operation on tree length, it's calculated with %(modulo).
      // Iterate on tree to halve it 5 times.
      const iterationCount =
        (tree.length % 2) + (tree.length - (tree.length % 2)) / 2;
      for (let i = 0; i < iterationCount; i++) {
        // ndx is an index calculation for each iteration
        // which makes you pick items from tree of magnitudes of 2
        // Picking magnitudes of 2 gives you the ability to pick
        // an item and next item without overlap from previous iteration
        const ndx = i * 2;
        // Don't worry if tree[ndx + 1] may be undefined, we check
        // that in hashPairs function and we don't use it if it's
        // undefined
        condensedTree.push(hashPairs(tree[ndx], tree[ndx + 1]));
      }
      // Recurse
      return createMerkleTree(condensedTree, index + 1);
    }
  }
};

module.exports = tree => createMerkleTree(tree, 0);
