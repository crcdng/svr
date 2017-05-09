// relays incoming osc/websocket browser messages to a osc/udp host
const os = require("os"), osc = require("osc"), WebSocket = require("ws")

const udp = new osc.UDPPort({
  localAddress: "10.188.12.103",  // configure this
  localPort: 7400,                // configure this
  remoteAddress: "10.188.20.6",   // configure this
  remotePort: 10000               // configure this
})

udp.on("ready", function () {
  console.log("Listening for OSC over UDP.")
  console.log(" Host:", udp.options.localAddress + ", Port:", udp.options.localPort)
  console.log("Broadcasting OSC over UDP to", udp.options.remoteAddress + ", Port:", udp.options.remotePort)
})

udp.open()

const wss = new WebSocket.Server({
  port: 12000       // configure this
})

wss.on("connection", function (socket) {
  console.log("A Web Socket connection has been established!")
  const socketPort = new osc.WebSocketPort({
    socket: socket
  })

  const relay = new osc.Relay(udp, socketPort, {
    raw: true
  });
});
