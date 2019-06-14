// Fall through to the generic server with the correct web root dir.
const rootDir = __dirname;
module.exports = require("../../shared/utils/web/server.js")(rootDir);
