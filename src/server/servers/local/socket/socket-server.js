// Set up the socket server for real-time communication about the state
// of the game host without interfering with the actual game host work.
const administrativeSocketServer = require("http").Server();
const io = require("socket.io")(administrativeSocketServer);
const API = require("./API");
const { users } = require("../../game-host/game-host.js");

io.on(`connection`, admin => {
  console.log(`admin connected to socket server`);

  const sharedState = { users };
  API.setup(admin, `server`, sharedState);

  // TODO: does this need to be folded into the API system?
  //       having to manually write namespaced functions is ugly...
  users.listen({
    add: (user) => admin.emit('hub:user-added', user),
    remove: (user) => admin.emit('hub:user-removed', user)
  });
});

module.exports = administrativeSocketServer;
