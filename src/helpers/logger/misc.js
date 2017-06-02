const log4js = require('log4js');

log4js.configure({
  appenders: [
    { type: 'console' },
  ],
});

const logger = log4js.getLogger();
logger.setLevel(process.env.VINCI_LOG_LEVEL || 'INFO');

module.exports = logger;
