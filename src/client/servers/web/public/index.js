import User from "./user.js";
import upgradeSocket from "./upgrade-socket.js";

// Connect to the client's local socket server for real-time data exchange.
const socket = upgradeSocket(io("http://localhost:8080"));

// Construct a user representation.
const user = new User(socket);

// Start things off making sure we have a name.
const start = async () => {
  let name = await user.getName();

  // If we have one, we're done.
  if (name) {
    user.name = name;
    user.render();
  }

  // If we don't, have the user specify one.
  else {
    let name = prompt("name?");
    let confirm = await user.setName(name);
    if (confirm) {
      console.log("name acknowledged");
      user.render();
    } else {
      console.log("oh no, name was not acknowledged O_O");
    }
  }
};

// start things off.
start();
