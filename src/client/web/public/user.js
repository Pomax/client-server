import NSWrapped from "./ns-wrapped.js";

/**
 * A simple front-end user class
 */
class User extends NSWrapped {
  constructor(socket) {
    super(socket, `user`);
    this.name = false;
  }

  // Get our name from the client.
  getName() {
    return this.send(`get-name`);
  }

  // Set our name, and notify the client of this face.
  setName(name) {
    this.name = name;
    return this.send(`set-name`, { name });
  }

  // Render this user, which is a bit hacky atm
  // becaue it reaches into the `document`...
  render() {
    let nameElement = document.getElementById("user-name");
    nameElement.textContent = ` - (${this.name})`;
  }
}

export default User;
