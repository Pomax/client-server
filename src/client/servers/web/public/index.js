import upgradeSocket from "./upgrade-socket.js";

// connect to the client's local socket server for real-time data exchange.
const socket = io("http://localhost:8080");

upgradeSocket(socket);

const user = {};

const renderUserName = () => {
  let name = user.name;
  let nameElement = document.getElementById("user-name");
  nameElement.textContent = ` - (${name})`;
};

const start = async () => {
  //  // set up listening
  //  socket.on("user-added", user => userlist.addUser(user));
  //  socket.on("user-removed", user => userlist.removeUser(user));

  // ask the server for the userlist
  let name = await socket.emit("user:get-name");

  if (name) {
    user.name = name;
    renderUserName();
  } else {
    let name = prompt("name?");
    let confirm = await socket.emit("user:set-name", { name });

    if (confirm) {
      console.log("name acknowledged");
      user.name = name;
      renderUserName();
    } else {
      console.log("oh no, name was not acknowledged O_O");
    }
  }
};

// start things off.
start();
