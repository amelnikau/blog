const winston = require('winston');
const appRoot = require('app-root-path');

const logger = new (winston.Logger) ({
    level: 'info',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: appRoot + '/blog.log' })
    ]
});

module.exports = logger;