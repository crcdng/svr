# ivt idc for svr

IVT IDC - Interactive Dome (Immersive Vision Theatre) Client for the shared virtual reality research group (SVR).

Experimenting with interactive fulldome and VR.

Web clients send device orientation data via OSC messages to the server (unidirectional for now).

Client (OSC/Websockets) ->  Server (OSC/udp) -> [OSC receiver]

`/rot <id> <alt> <azi>`

where
* `<id>` is a pseudo-unique id for each client
* `<alt>` is the altitude/elevation angle in degrees [-90..90]
* `<azi>` is the horizontal angle in degrees [0..360]

The orientation data comes out of [https://aframe.io/](https://aframe.io/) with the horizontal angle restricted to [0..360].

Configure the following objects:

1. client/index.html: `osc.WebSocketPort`: the websocket server ip:port
2. server/index.js: `WebSocket.Server` the port from step 1
3. server/index.js: `osc.UDPPort`: the local ip address (localhost/127.0.0.1 might not work) and a local port
3. server/index.js: `osc.UDPPort`: the remote ip address and port. this is where the data gets forwarded to (Touch Designer, Max/MSP, supercollider, ...).

To run:

* serve the client over HTTP/HTTPS (I use live-server for quick development). *This is the ip:port that the phones connect to.*
* serve the server (e.g. forever)

The server code (basically an example from [osc.js](https://github.com/colinbdclark/osc.js-examples)) is written in ES6/standard.js. The client code is written in ES5. 🙄
