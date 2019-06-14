process.stdin.resume();

// Run whatever code needs to run just before this process exits.
const exitHandler = () => {
  process.onexit();
  process.exit();
};

// There's quite a few "nonstandard" kill signals.
process.on("SIGINT", exitHandler);
process.on("SIGUSR1", exitHandler);
process.on("SIGUSR2", exitHandler);
process.on("uncaughtException", exitHandler);
