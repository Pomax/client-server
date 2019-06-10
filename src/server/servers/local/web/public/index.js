import upgradeSocket from "./upgrade-socket.js";
import Hub from "./hub.js";


// connect to the server's local socket server for
// real time data exchange.
const socket = upgradeSocket(io("http://localhost:8080"));
const hub = new Hub(socket);
document.body.append(hub.el);

const start = async () => {
  hub.getCurrentList();
};

// start things off.
start();
