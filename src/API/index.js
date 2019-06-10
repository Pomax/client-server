const generateAPI = require('../shared/utils/generate-api.js');

module.exports = generateAPI([
  require("./user.js"),
  require("./connection.js")
]);
