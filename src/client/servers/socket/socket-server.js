const beforeSIGINT = require("../../../shared/utils/before-sigint");
const API = require("../../../API/index.js");

// Set up a socket _connection_ (not server) to the game host socket server.
const gameHostURL = `http://localhost:${process.argv[2]}`;
const gameHost = require(`socket.io-client`)(gameHostURL);
API.client.setup(gameHost);

// And set up a socket _server_ for the user to connect to.
const clientSocketServer = require("http").Server();
const io = require("socket.io")(clientSocketServer);

// Set up this client's user representation
// (of which there can only be one, of course);
const user = {};

// Properly start everything when a user loads up the
// client's address in their browser, and thus initiate
// a socket connection to this server.
io.on(`connection`, clientSocket => {
  API.client.user.setup(clientSocket, { user, gameHost });
  console.log(`client connected to socket server`);
});

// Bonus points: gracefully shutdown when someone
// issues a kill/ctrl-c etc. for the server.
beforeSIGINT(() => gameHost.disconnect());

module.exports = clientSocketServer;
