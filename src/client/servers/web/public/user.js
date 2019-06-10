/**
 * A simple front-end user class
 */
class User {
  constructor(socket) {
    this.socket = socket;
    this.name = false;
  }

  // auto-namespacing socket emission
  _send(evtName, data) {
    return this.socket.emit(`user:${evtName}`, data);
  }

  // Get our name from the client.
  getName() {
    return this._send(`get-name`);
  }

  // Set our name, and notify the client of this face.
  setName(name) {
    this.name = name;
    return this._send(`set-name`, { name });
  }

  // Render this user, which is a bit hacky atm
  // becaue it reaches into the `document`...
  render() {
    let nameElement = document.getElementById("user-name");
    nameElement.textContent = ` - (${this.name})`;
  }
}

export default User;
