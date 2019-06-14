/**
 * The game hub API for user management, creating games, etc.
 */
module.exports = {
  namespace: "hub",
  client: {
    // nothing for now
  },
  server: {
    "get-user-list": function(_data, respond) {
      const { users } = this.state;
      const list = users.map(user => ({ name: user.name }));
      respond(list);
    }
  }
};
