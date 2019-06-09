const join = require(`path`).join;

module.exports = function sanitizeLocation(location, rootDir, publicDir) {

  // special handling for /
  if (location === `/`) return join(publicDir, `public`, `index.html`);

  // socket.io gets pulled from the node_modules dir
  if (location === `/socket.io.js`) return join(rootDir, `node_modules`, `socket.io-client`, `dist`, `socket.io.dev.js`);

  // the socket upgrade gets pulled from the utils dir
  if (location === `/upgrade-socket.js`) return join(rootDir, `src`, `shared`, `utils`, `upgrade-socket.js`);

  // the socket upgrade gets pulled from the utils dir
  if (location === `/wrap-socket.js`) return join(rootDir, `src`, `shared`, `utils`, `socket-namespace-wrapper.js`);

  // everything else is a static asset and we sanitize it.
  location = location.substring(1);
  location = location.replace(/\.\./g, ``).replace(/\/\//g, `/`);
  location = join(publicDir, `public`, location);

  return location;
};
