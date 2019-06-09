const beforeSIGINT = require("../../../shared/utils/before-sigint");
const upgradeSocket = require("../../../shared/utils/upgrade-socket.js");
const wrap = require("../../../shared/utils/socket-namespace-wrapper.js");
const { UserAPI, ConnectionAPI } = require("../../../API");

// Set up a socket _connection_ (not server) to the game host socket server.
const gameHostURL = `http://localhost:${process.argv[2]}`;
const gameHost = upgradeSocket(require(`socket.io-client`)(gameHostURL));
wrap(gameHost, ConnectionAPI.namespace, ConnectionAPI.client);

// And set up a socket _server_ for the user to connect to.
const clientSocketServer = require("http").Server();
const io = require("socket.io")(clientSocketServer);

// Set up this client's user representation
// (of which there can only be one, of course);
const user = {};

// Properly start everything when a user loads up the
// client's address in their browser, and thus initiate
// a socket connection to this server.
io.on(`connection`, client => {
  upgradeSocket(client);
  wrap(client, UserAPI.namespace, UserAPI.client)({ user, gameHost });
  console.log(`client connected to socket server`);
});

// Bonus points: gracefully shutdown when someone
// issues a kill/ctrl-c etc. for the server.
beforeSIGINT(() => gameHost.disconnect());

module.exports = clientSocketServer;
