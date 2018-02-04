const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
        _id: String,
        title: String,
        author: String,
        body: String,
        comments: [{body: String, date: Date}],
        date: {type: Date, default: Date.now},
        hidden: Boolean,
        meta: {
            votes: Number,
            favs: Number
        },
    },
    {versionKey: false});

const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;