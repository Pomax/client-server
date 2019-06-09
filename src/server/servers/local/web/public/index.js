import upgradeSocket from "./upgrade-socket.js";
import UserListing from "./user-listing.js";
const userlist = new UserListing();
document.body.append(userlist.el);

// connect to the server's local socket server for
// real time data exchange.
const socket = io("http://localhost:8080");

upgradeSocket(socket);

const start = async () => {
  // set up listening
  socket.on("hub:user-added", user => userlist.addUser(user));
  socket.on("hub:user-removed", user => userlist.removeUser(user));

  // ask the server for the userlist
  let users = await socket.emit("hub:get-user-list");
  userlist.setList(users);
};

// start things off.
start();
