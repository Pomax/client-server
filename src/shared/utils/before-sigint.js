module.exports = function beforeExit(runBeforeExiting) {
  process.stdin.resume();

  const exitHandler = () => {
    runBeforeExiting();
    process.exit();
  };

  process.on("SIGINT", exitHandler);
  process.on("SIGUSR1", exitHandler);
  process.on("SIGUSR2", exitHandler);
  process.on("uncaughtException", exitHandler);
};
