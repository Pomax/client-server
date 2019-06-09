module.exports = {
  namespace: false,

  client: {
    connect_error: () => {
      console.log(`Server unavailable`);
    },

    connect: () => {
      console.log(`client connected`);
    },

    disconnect: () => {
      console.log(`disconnected from server`);
      process.exit();
    }
  },

  server: {
    disconnect: function() {
      const { users } = this.state;

      // remove the user from the system
      let pos = users.findIndex(u => (u.socket === this));
      if (pos > -1) {
        let user = users[pos];
        users.splice(pos, 1);
        console.log(`Removed ${user.name} as a client`);
      } else {
        console.log(`Unnamed client disconnected.`);
      }
    }
  }
};
