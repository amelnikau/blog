let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{versionKey: false});

userSchema.plugin(uniqueValidator);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;