const { createHash } = require("crypto");

const doDoubleSHA = obj => {
  return createHash("sha256")
    .update(
      createHash("sha256")
        .update(JSON.stringify(obj))
        .digest("hex")
    )
    .digest("hex");
};

module.exports = {
  doDoubleSHA
};
