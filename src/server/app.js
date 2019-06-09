require('../shared/utils/sequenced-console-log.js');

// Set up a game host - this part has to happen.
const gameHost = require('./servers/game-host/game-host.js');
gameHost.start();

// Set up a local inspection server - this part is 100% optional.
const localInspection = require('./servers/local/local.js');
localInspection.start();