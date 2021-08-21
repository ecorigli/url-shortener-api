const process = require('process');
const config = require('./config');
const pkg = require('../package.json');

const onServerError = () => logger.error({ message: 'Server error' });

const onListen = (port) => {
  console.info(`${pkg.name}\n`);
};

const onProcessKill = (server) => {
  setTimeout(() => {
    server.close(() => process.exit(0));
  }, 300);
};

const onException = (err) => console.log({ message: err });

module.exports = {
  onListen,
  onProcessKill,
  onServerError,
  onException,
};
