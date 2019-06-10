/**
 * This is the API that deals with the basics of socket connections.
 */
const ConnectionAPI = {
  namespace: false,

  // For clients, we just want to know when connect/disconnect has
  // happened, and whether or not the server is reachable at all.
  client: {
    incoming: {
      connect_error: () => {
        // console.log(`Server unavailable`);
      },

      connect: () => {
        console.log(`client connected`);
      },

      disconnect: () => {
        console.log(`disconnected from server`);
        process.exit();
      }
    },

    outgoing: {
      // nothing
    }
  },

  // For clients, we just want to know when connect/disconnect has
  // happened, and whether or not the server is reachable at all.
  server: {
    incoming: {
      disconnect: function() {
        const { users } = this.state;

        // remove the user from the system
        let pos = users.findIndex(u => u.socket === this);
        if (pos > -1) {
          let user = users[pos];
          users.splice(pos, 1);
          console.log(`Removed ${user.name} as a client`);
        } else {
          console.log(`Unnamed client disconnected.`);
        }
      }
    },

    outgoing: {
      // nothing
    }
  }
};

module.exports = ConnectionAPI;
