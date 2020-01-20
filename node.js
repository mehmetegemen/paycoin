// I wanted to use native node.js abilities to
// benefit more from my learning endeavor
const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  
});

server.on("listening", () => {
  console.info(`Node is receiving connections on udp ${server.address().port}`)
})

server.bind(process.env.PC_NODE_PORT || 44231);