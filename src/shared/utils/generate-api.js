const upgradeSocket = require("./upgrade-socket.js");

/**
 * ...docs go here...
 *
 * @param {api definition} entry
 * @param {api incoming function object} incoming
 * @param {api outgoing function object} outgoing
 */
const setupFunction = function(endpoint, name, entry, incoming, outgoing) {

  /**
   * ...docs go here...
   *
   * @param {socket} socket
   * @param {object} initialState
   */
  return (socket, initialState = {}) => {
    console.log(`setup:`, endpoint, name);

    // bind improved `emit` and `on` functions
    upgradeSocket(socket);

    // figure out the namespace for event passing
    namespace = entry.namespace ? `${entry.namespace}:` : ``;

    // auto-namespaced emission
    socket.send = (evtname, data) =>
      socket.emit(`${namespace}${evtname}`, data);

    // give all outgoing functions a this=socket binding
    Object.keys(outgoing).forEach(fname => {
      outgoing[fname] = outgoing[fname].bind(socket);
    });

    // then auto-bind all the incoming functions
    Object.keys(incoming).forEach(fname => {
      let evtname = `${namespace}${fname}`;
      let fn = incoming[fname].bind(socket);
      socket.on(evtname, fn);
    });

    // Add the mechanism that lets API functions call `this.state[...]` things.
    socket.state = initialState;

    // and return the object that handles outgoing data.
    return outgoing;
  };
};

/**
 * ...docs go here...
 *
 * @param {*} list
 */
function generateAPI(list) {
  const API = {
    client: {},
    server: {}
  };

  const setups = [];

  list.forEach(entry => {
    Object.keys(API).forEach(endpoint => {
      let name = entry.namespace;
      let incoming = entry[endpoint].incoming || {};
      let outgoing = entry[endpoint].outgoing || {};

      if (!!name) {
        API[endpoint][name] = outgoing;
        console.log(endpoint, name, `adding to setup Functions`);
        outgoing.setup = setupFunction(endpoint, name, entry, incoming, outgoing);
        setups.push(outgoing.setup);
      }

      else {
        console.log(endpoint, name, `adding to setup Functions`);
        API[endpoint].setup = setupFunction(endpoint, name, entry, incoming, outgoing);
        setups.push(API[endpoint].setup);
      }

      console.log(setups.length);
    });
  });

  API.setup = (socket, initialState) => {
    console.log(`general api.setup call`, setups.length);
    setups.forEach(setup => {
      console.log('x');
      setup(socket, initialState);
    });
  };

  return API;
}

module.exports = generateAPI;
