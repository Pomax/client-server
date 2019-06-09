module.exports = {

  namespace: "user",

  // The user-side API (user <=> client)
  client: {
    API: {
      "get-name": function(_data, respond) {
        const { user } = this.state;

        respond(user.name);
      },

      "set-name": async function(data, respond) {
        const { user } = this.state;

        // set name for this client
        user.name = data.name;

        // then respond to make sure the client knows it got committed
        respond(true);

        // and then register this client to the game server!
        this.state.gameHost.emit('user:register', user);
      }
    }
  },

  // The server-side API  (server <=> client)
  server: {
    API: {
      register: function(user, respond) {
        const { users } = this.state;

        // register the user into the system
        console.log(`Registering ${user.name} as a client`);
        user.socket = this;
        users.push(user);
        respond();
      }
    }
  }

};
