const winston = require('winston');

const logger = new (winston.Logger) ({
    level: 'info',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: '../blog.log' })
    ]
});

module.exports = logger;