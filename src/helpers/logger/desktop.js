const log4js = require('log4js');

log4js.configure({
  appenders: [
    process.env.NODE_ENV === 'production'
      ? { type: 'file', filename: '/www/log/meipu_vinci/log4js-desktop.log' }
      : { type: 'console' },
  ],
});

const logger = log4js.getLogger();
logger.setLevel(process.env.VINCI_LOG_LEVEL || 'INFO');

module.exports = logger;
