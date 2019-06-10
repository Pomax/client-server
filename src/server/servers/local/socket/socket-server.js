// Set up the socket server for real-time communication about the state
// of the game host without interfering with the actual game host work.
const administrativeSocketServer = require("http").Server();
const io = require("socket.io")(administrativeSocketServer);
const { users } = require("../../game-host/game-host.js");
const API = require("./API");

io.on(`connection`, admin => {
  console.log(`admin connected to socket server`);

  const hub = API.server.hub.setup(admin, { users });

  users.listen({
    add: user => hub.userAdded(user),
    remove: user => hub.userRemoved(user)
  });
});

module.exports = administrativeSocketServer;
