const logger = require("../log/logger");

const errorHandler = (err, req, res, next) => {
    logger.error(`processing error ${err}`);
    res.status(400);
    res.json({error: err.message});
};

module.exports = errorHandler;