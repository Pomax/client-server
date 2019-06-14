const join = require(`path`).join;

module.exports = function sanitizeLocation(location, projectDir, webRootDir) {

  // special handling for /
  if (location === `/`) return join(webRootDir, `public`, `index.html`);

  // socket.io gets pulled from the node_modules dir
  if (location === `/socket.io.js`) return join(projectDir, `node_modules`, `socket.io-client`, `dist`, `socket.io.dev.js`);

  // the socket upgrade gets pulled from the utils dir
  if (location === `/upgrade-socket.js`) return join(projectDir, `src`, `shared`, `utils`, `upgrade-socket.js`);

  // the socket upgrade gets pulled from the utils dir
  if (location === `/wrap-socket.js`) return join(projectDir, `src`, `shared`, `utils`, `socket-namespace-wrapper.js`);

  // A client-side wrapper for namescaped on/emit
  if (location === '/ns-wrapped.js') return join(projectDir, `src`, `shared`, `utils`, `web`, `ns-wrapped.js`);

  // everything else is a static asset and we sanitize it.
  location = location.substring(1);
  location = location.replace(/\.\./g, ``).replace(/\/\//g, `/`);
  location = join(webRootDir, `public`, location);

  return location;
};
