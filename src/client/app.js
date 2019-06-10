// shim console.log to include a sequencing of sorts.
require("../shared/utils/sequenced-console-log.js");

// Set up a web server for _loading_ the browser-based game host administration page
const webServer = require("./servers/web/web-server.js");

// Set up a socket server for _handling_ the browser-based game host administration
const socketServer = require("./servers/socket/socket-server.js");

socketServer.listen(0, () => {
  const socketServerPort = socketServer.address().port;

  console.log(
    `Start client socket server on http://localhost:${socketServerPort}`
  );

  // And start the web server for this client so users can _use_ it.
  webServer.start(socketServerPort, port =>
    console.log(`Start client web server on http://localhost:${port}`)
  );
});
