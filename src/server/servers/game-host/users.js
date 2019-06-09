const summarize = user => {
  return {
    name: user.name
  };
};

const users = [];
const _listeners = [];

users.listen = listener => {
  _listeners.push(listener);
};

const _push = users.push.bind(users);

users.push = (...args) => {
  args.forEach(e => {
    _push(e);
    _listeners.forEach(l => l.add(summarize(e)));
  });
};

const _splice = users.splice.bind(users);

users.splice = (pos, count) => {
  const removed = _splice(pos, count);
  removed.forEach(e => {
    _listeners.forEach(l => l.remove(summarize(e)));
  });
};

module.exports = users;
