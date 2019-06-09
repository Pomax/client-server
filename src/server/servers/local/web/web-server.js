const fs = require(`fs`);
const http = require(`http`);
const getContentType = require("../../../../shared/utils/web/get-content-type.js");
const sanitizeLocation = require("../../../../shared/utils/web/sanitize-location.js");
const generate404 = require("../../../../shared/utils/web/404.js");
const nodeToESM = require("../../../../shared/utils/web/node-to-esm.js");

module.exports = {
  start: (socketServerPort, whenStarted) => {
    const administrativeWebServer = http.Server((request, response) => {
      var location = sanitizeLocation(request.url, process.cwd(), __dirname);

      fs.readFile(location, (error, content) => {
        if (error) return generate404(location, response);
        content = nodeToESM(location, content, socketServerPort);
        response.writeHead(200, { "Content-Type": getContentType(location) });
        response.end(content, `utf-8`);
      });
    });

    administrativeWebServer.listen(0, () =>
      whenStarted(administrativeWebServer.address().port)
    );
  }
};