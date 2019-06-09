let updated = false;

if (updated === false) {
  updated = true;

  const _log = console.log;
  const start = Date.now();
  const seqnum = () => {
    return (((Date.now() - start) / 100) | 0) & 0x00000fff;
  };

  console.log = ((...args) => {
    _log(`[${seqnum()}]`, ...args);
  }).bind(console);
}

module.exports = console.log;
