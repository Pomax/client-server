/**
 * The game hub API for user management, creating games, etc.
 */
module.exports = {
  namespace: "hub",

  client: {
    outgoing: {
      // nothing for now
    },

    incoming: {
      addUser: function(user, respond) {
        // add user to this hub
      },
      removeUser: function(user) {
        // remove user from this hub
      }
    }
  },

  server: {
    outgoing: {
      userAdded: function(user) {
        return this.send("user_added", user);
      },
      userRemoved: function(user) {
        return this.send("user_removed", user);
      }
    },

    incoming: {
      "get-user-list": function(_data, respond) {
        const { users } = this.state;
        const list = users.map(user => ({ name: user.name }));
        respond(list);
      }
    }
  }
};
