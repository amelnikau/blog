const logger = require("../log/logger");

const requestLogger = (req, res, next) => {
    logger.info(`${req.method} to ${req.url} at ${new Date().toUTCString()}`);
    next();
};

module.exports = requestLogger;