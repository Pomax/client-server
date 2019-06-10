import NSWrapped from "./ns-wrapped.js";

class Hub extends NSWrapped {
    constructor(socket) {
      super(socket, `hub`);

      this.users = [];
      this.el = document.createElement("ul");

      this.listen();
    }

    listen() {
      this.on("user-added", user => this.addUser(user));
      this.on("user-removed", user => this.removeUser(user));
    }

    async getCurrentList() {
      let users = await this.send("get-user-list");
      this.setList(users);
    }

    setList(list) {
      console.log(`list:`, list);
      this.users = list;
      this.update();
    }

    addUser(user) {
      console.log(`add`, user);
      this.users.push(user);
      this.update();
    }

    removeUser(user) {
      console.log(`remove`, user);
      let pos = this.users.findIndex(v => (v.id === user.id));
      if (pos !== -1) {
        this.users.splice(pos, 1);
        this.update();
      }
    }

    update() {
      this.el.textContent = "";
      this.users.forEach(user => {
        let li = document.createElement("li");
        li.textContent = user.name;
        this.el.appendChild(li);
      });
    }
  }

  export default Hub;
