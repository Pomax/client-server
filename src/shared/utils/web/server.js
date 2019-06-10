// basic http/filesystem functionality
const http = require(`http`);
const fs = require(`fs`);

// utility functions
const getContentType = require("./get-content-type.js");
const sanitizeLocation = require("./sanitize-location.js");
const generate404 = require("./404.js");
const nodeToESM = require("./node-to-esm.js");

// Generator - needs to know which public dir to serve static content from
module.exports = function setupServer(publicDir) {
  return {
    start: (port, whenStarted) => {
      const webServer = http.Server((request, response) => {
        var location = sanitizeLocation(request.url, process.cwd(), publicDir);

        // server content from the filesystem as appropriate
        fs.readFile(location, (error, content) => {
          if (error) return generate404(location, response);

          // Some files are used both node-side and browser-side, and so need
          // a bit of rewriting to make sure they work for the browser.
          content = nodeToESM(location, content, port);
          response.writeHead(200, { "Content-Type": getContentType(location) });
          response.end(content, `utf-8`);
        });
      });

      // open a server with port 0, which makes it pick "whatever port is available".
      webServer.listen(0, () =>
        whenStarted(webServer.address().port)
      );
    }
  };
};
