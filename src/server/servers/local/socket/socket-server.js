const upgradeSocket = require("../../../../shared/utils/upgrade-socket.js");
const wrap = require("../../../../shared/utils/socket-namespace-wrapper.js");
const administrativeSocketServer = require("http").Server();
const io = require("socket.io")(administrativeSocketServer);

const { GameHubAPI } = require("./API");
const { users } = require("../../game-host/game-host.js");

io.on(`connection`, admin => {
  console.log(`admin connected to socket server`);
  upgradeSocket(admin);

  const sharedState = { users };
  wrap(admin, GameHubAPI.namespace, GameHubAPI.API)(sharedState);

  // TODO: this needs to be folded into the API system
  users.listen({
    add: (user) => admin.emit('hub:user-added', user),
    remove: (user) => admin.emit('hub:user-removed', user)
  });
});

module.exports = administrativeSocketServer;
