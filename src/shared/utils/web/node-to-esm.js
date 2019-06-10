/**
 * A custom module for ensuring that certain web requested files
 * will actually work once loaded by the browser. E.g. making sure
 * that the socket server port is the correct one, that any mention
 * of `module.exports` becomes `export defaults`, etc.
 */
module.exports = function nodeToESM(location, content, socketServerPort) {
  if (location.endsWith(`index.js`)) {
    content = content
      .toString()
      .replace(
        `io("http://localhost:8080");`,
        `io("http://localhost:${socketServerPort}");`
      );
  }

  if (location.endsWith(`upgrade-socket.js`)) {
    content = content
      .toString()
      .replace(`module.exports = `, `export default `);
  }

  if (location.endsWith(`socket-namespace-wrapper.js`)) {
    content = content
      .toString()
      .replace(`module.exports = `, `export default `);
  }

  return content;
};
