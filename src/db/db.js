const mongoose = require('mongoose');
const config = require("../config/config");
const logger = require("../log/logger");

const { db: { host, port, name } } = config;
const dbUrl = `mongodb://${host}:${port}/${name}`;
mongoose.connect(dbUrl);

mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open to ' + dbUrl);
});

mongoose.connection.on('error',function (err) {
    logger.error('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        logger.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
