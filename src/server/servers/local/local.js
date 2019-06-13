// Set up a socket server for _handling_ the browser-based game host administration

module.exports = {
  start: () => {
    // Start the socket server first...
    const socketServer = require("./socket/socket-server.js");
  }
};
