const userModel = require("../models/user_model");

async function saveUser(user) {
    return await userModel.create(user);
}

async function findByUsername(username) {
    return await userModel.findOne({username: username});
}

module.exports = {
    findByUsername,
    saveUser
};