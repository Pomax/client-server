// A simple bit of code for now, hacking up
// an array to act like an object...
// TODO: turn this into a normal class =)

const summarize = user => {
  // Convert a user object into something
  // that we can send over the wire, because
  // Socket.io crashes HARD on circular
  // references and not-primitive-data-types...
  return { name: user.name };
};

const users = [];
const _listeners = [];

users.listen = listener => {
  _listeners.push(listener);
};

// Change .push() so that it both queues and notifies
const _push = users.push.bind(users);
users.push = (...args) => {
  args.forEach(e => {
    _push(e);
    _listeners.forEach(l => l.add(summarize(e)));
  });
};

// Change .splice() so that it both prunes and notifies
const _splice = users.splice.bind(users);
users.splice = (pos, count) => {
  const removed = _splice(pos, count);
  removed.forEach(e => {
    _listeners.forEach(l => l.remove(summarize(e)));
  });
};

module.exports = users;
