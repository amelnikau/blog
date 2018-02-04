const config = {
    server: {
        port: 3000
    },
    db: {
        host: 'localhost',
        port: 27017,
        name: 'frontcamp'
    },
    jwt: {
        pass: 'hideme' // should be set in .env file and not commited to repo
    }
};

module.exports = config;