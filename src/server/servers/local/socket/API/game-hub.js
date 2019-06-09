module.exports = {
  namespace: "hub",
  API: {
    "get-user-list": function(_data, respond) {
      const { users } = this.state;
      const list = users.map(user => ({ name: user.name }));
      respond(list);
    }
  }
};
