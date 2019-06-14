// add an onexit handler to process
require('../shared/utils/process/onexit');

// shim console.log to include a sequencing of sorts.
require('../shared/utils/sequenced-console-log.js');

// Set up a game host - this part has to happen.
require('./servers/game-host/game-host.js');

// Set up a local inspection server - this part is 100% optional.
require('./servers/local/local.js');
