// This module shims console.log so that anything you log
// ends up with a pseudo-sequence number: each number will
// be equal to or greater than the preceding number.
let updated = false;

if (updated === false) {
  updated = true;

  // cache the original log function
  const _log = console.log;

  // peg the sequencing to "now"
  const start = Date.now();
  const seqnum = () => {
    return (((Date.now() - start) / 100) | 0) & 0x00000fff;
  };

  // and rebind a new log function that adds in the automatic
  // sequence numbering.
  console.log = ((...args) => {
    _log(`[${seqnum()}]`, ...args);
  }).bind(console);
}

module.exports = console.log;
