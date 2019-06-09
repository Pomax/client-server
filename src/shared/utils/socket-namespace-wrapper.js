/**
 * This is a utility function that binds APIs to sockets,
 * in a way that allows users to write "what needs to exist"
 * for socket communication to work, rather than writing all
 * the code for listening and responding.
 *
 * The `namespace` argument can either be a string, or `false`.
 * If a string, all API functions will be turned into event
 * names prefixed with that namespace, seprated by a colon (:).
 * If `false`, no namespace prefixing to the event names will
 * be performed.
 *
 * The `config` argument must be an object, either of the form:
 *
 *   {
 *     evtname: function(data, respond) {
 *       // any code here can use `this` to refer to the socket,
 *       // and `this.state` to refer to bootstrapped data.
 *     }
 *   }
 *
 * or of the form:
 *
 *   {
 *     API: { ...as above... }
 *     exceptions: [ ...list of function names... ]
 *   }
 *
 * Any function name mentioned in the `exceptions` list will
 * bypass the namespace prefixing process.
 *
 * The wrapper function rebinds each function so that `this`
 * refers to the socket that was involved in the wrapping.
 *
 *   NOTE: for this reason, DO NOT USE ARROW FUNCTIONS
 *         in this API code block. Only use the standard
 *         `function(...){...}`, as arrow functions have
 *         their execution context fixed at the time of
 *         declaration, and silently reject any attempt
 *         to rebind it to something else!
 *
 * The wrapper function RETURNS a function that allows passing
 * in an object to act as initial state, which can be accessed
 * in the actual code as `this.state`.
 *
 */
function wrap(socket, namespace, config) {
  const API = config.API || config;
  const exceptions = config.exceptions || [];

  namespace = namespace ? `${namespace}:` : ``;

  Object.keys(API).forEach(fname => {
    // ensure that "this" points to the socket
    let fn = API[fname].bind(socket);

    // determine whether to leave this event "unnamespaced"
    let evt = fname;
    if (exceptions.indexOf(fname) === -1) {
      evt = `${namespace}${fname}`;
    }

    // and then set up the socket binding for this event
    socket.on(evt, fn);
  });

  // Add the mechanism that lets API functions call `this.state[...]` things.
  socket.state = {};
  return newState => (socket.state = newState);
};

// gets replaced by an export default wrap when served for the browser
module.exports = wrap;
