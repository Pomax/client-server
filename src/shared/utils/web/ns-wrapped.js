/**
 * A wrapper class for objects that deal with sockets,
 * setting up an `on` and `send` function that both
 * automatically prefix messages with the correct
 * namespace, based on what was passed in the constructor.
 *
 * Use this as a super-class for any socket-using objects
 * you need, so you don't end up manually specifying
 * event names with namespace prefixes and hunting down
 * typos or missed prefixes.
 *
 * For examples, see the client/web/public/user.js and
 * server/servers/local/web/public/hub.js files.
 */
class NSWrapped {
  constructor(socket, namespace) {
    this.socket = socket;
    this.ns = namespace;
  }

  async on(evtName, fn) {
    this.socket.on(`${this.ns}:${evtName}`, fn);
  }

  async send(evtName, data) {
    return this.socket.emit(`${this.ns}:${evtName}`, data);
  }
}

export default NSWrapped;
