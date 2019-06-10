const UserAPI = {
  namespace: "user",

  // The user-side API (user <=> client)
  client: {
    incoming: {
      get_name: function(_data, respond) {
        const { user } = this.state;

        // let the user know what the client thinks its name is
        respond(user.name);
      },

      set_name: async function(data, respond) {
        const { user } = this.state;

        // save the user's name and then connect to th game host
        user.name = data.name;
        respond(true);

        // TODO: make this a direct call.
        console.log('sending gamehost user:register');
        this.state.gameHost.emit("user:register", user);
      }
    },

    outgoing: {
      // nothing
    }
  },

  // The server-side API  (server <=> client)
  server: {
    incoming: {
      register: function(user, respond) {
        const { users } = this.state;

        // register the user into the system
        console.log(`Registering ${user.name} as a client`);
        user.socket = this;
        users.push(user);
        respond();
      }
    },

    outgoing: {
      // nothing
    }
  }
};

module.exports = UserAPI;
