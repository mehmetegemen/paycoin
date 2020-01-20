const { randomBytes, createHash } = require("crypto");
const secp256k1 = require("secp256k1");
const { encode } = require("bs58");


module.exports = (amount) => {
  // Array of address to be return at the end
  const addresses = [];
  
  for (let i = 0; i < amount; i++) {
    let privateKey;
    
    // Create randomBytes till finding a valid private key
    // Usually first iteration is successful, which is in "do"
    // block. It's 32 bytes because a wallet's private key is
    // usually 256-bit long number.
    do {
      privateKey = randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privateKey));
    
    // Create ECDSA public key
    const publicKey = secp256k1.publicKeyCreate(privateKey);
    
    // Hash it as in the bitcoin specification, first sha256
    // and then RIPEMD160
    let publicKeyHash = createHash("sha256").update(publicKey).digest("hex");
    publicKeyHash = createHash("ripemd160").update(publicKeyHash).digest("hex");
    
    // Add network prefix "00"
    let address = "00" + publicKeyHash;
    
    // Perform Double sha256 of prefixed public key hash
    // for creating a trailer checksum
    let trailer = createHash("sha256").update(address).digest("hex");
    trailer = createHash("sha256").update(trailer).digest("hex");
    // Get first 8 digits of the trailer checksum
    trailer = trailer.substr(0, 8);
    // and append it to hex address
    address = address + trailer;
    
    // Base58 encode the last hex address value
    // with prefix, public key hash and checksum trailer
    address = encode(Buffer.from(address, "hex"));
    addresses.push(address);
  }

  return addresses;
}

