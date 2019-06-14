// add an onexit handler to process
require('../shared/utils/process/onexit');

// shim console.log to include a sequencing of sorts.
require("../shared/utils/sequenced-console-log.js");

// Load the base requirements for getting things set up nicely.
const wrap = require("../shared/utils/socket-namespace-wrapper.js");
const { UserAPI, ConnectionAPI } = require("../API");

// Set up a socket _connection_ (not server) to the game host.
const gameHostURL = `http://localhost:${process.argv[2]}`;
const gameHost = require(`socket.io-client`)(gameHostURL);
wrap(gameHost, ConnectionAPI.namespace, ConnectionAPI.client);

// Set up our own socket _server_ for real-time messaging with the user.
const clientServer = require("./web/web-server.js");
const startNotice = port =>
  console.log(`Started client server on http://localhost:${port}`);
const server = clientServer.start(0, startNotice);
const io = require("socket.io")(server);

// Properly start everything when a user loads up the
// client's address in their browser, and thus initiate
// a socket connection to this server.
const setupBindings = client => {
  const user = {};
  wrap(client, UserAPI.namespace, UserAPI.client)({ user, gameHost });
  console.log(`client connected to socket server`);
};
io.on(`connection`, setupBindings);

// Bonus points: gracefully shutdown when someone
// issues a kill/ctrl-c etc. for the server.
process.onexit = () => gameHost.disconnect();
