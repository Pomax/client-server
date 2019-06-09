const gameSocketServer = require("http").Server();
const io = require("socket.io")(gameSocketServer);

const upgradeSocket = require("../../../shared/utils/upgrade-socket.js");
const wrap = require("../../../shared/utils/socket-namespace-wrapper.js");

const { UserAPI, ConnectionAPI } = require("../../../API");
const users = require('./users.js')

io.on(`connection`, client => {
  console.log(`client connected to server`);
  upgradeSocket(client);

  const sharedState = { users };
  wrap(client, UserAPI.namespace, UserAPI.server)(sharedState);
  wrap(client, ConnectionAPI.namespace, ConnectionAPI.server)(sharedState);
});

module.exports = {
  users: users,
  start: () => {
    gameSocketServer.listen(0, () =>
      console.log(
        `Start game host on http://localhost:${gameSocketServer.address().port}`
      )
    );
  }
};

/*
  gamehub:
  - usermanager
  - register = usermanager.add(user)
  - unregister = usermanager.remove(user)
*/
