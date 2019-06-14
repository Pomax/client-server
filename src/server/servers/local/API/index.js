const wrap = require("../../../../shared/utils/socket-namespace-wrapper.js");

const API = {
  GameHubAPI: require('./game-hub.js')
};

/**
 * setup(socket, type, initialState) that won't show up in a call
 * to Object.keys(API) so that we can still iterate over all keys
 * without binding `setup` itself as an API function.
 *
 * socket = the socket to wrap
 * type = `client` or `server`, or whatever custom key is used in the API objects.
 * initialState = an object with the initial shared state.
 *
 * All calls can update `this.state`, so be careful with that.
 */
Object.defineProperty(API, `setup`, {
  enumerable: false,
  value: (socket, type, state) => {
    Object.keys(API).forEach(key =>
      wrap(socket, API[key].namespace, API[key][type])(state)
    );
  }
});

module.exports = API;