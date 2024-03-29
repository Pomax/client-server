// Set up the core socket server for talking directly
// to the game engine. This is what clients connect to.
const gameSocketServer = require("http").Server();
const io = require("socket.io")(gameSocketServer);
const API = require("../../../API");

// This is our "hub", which manages clients (dis)connecting.
const users = require("./users.js");

io.on(`connection`, serverClient => {
  console.log(`client connected to server`);
  const sharedState = { users };
  API.setup(serverClient, `server`, sharedState);
});

gameSocketServer.listen(0, () =>
  console.log(
    `Started game host on port ${gameSocketServer.address().port}`
  )
);

module.exports = {
  users: users,
  server: gameSocketServer
};
