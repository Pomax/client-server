// Set up a web server for _loading_ the browser-based game host administration page
const webServer = require("./web/web-server.js");

// Set up a socket server for _handling_ the browser-based game host administration
const socketServer = require("./socket/socket-server.js");

module.exports = {
  start: () => {
    socketServer.listen(0, () => {
      const socketServerPort = socketServer.address().port;

      console.log(
        `Start game host administrative socket server on http://localhost:${socketServerPort}`
      );

      webServer.start(socketServerPort, port =>
        console.log(
          `Start game host administrative web server on http://localhost:${port}`
        )
      );
    });
  }
};
