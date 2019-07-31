var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    id_user: String,
    id_chat: String,
    username: String,
    display_name: String,
    avatar: String,
    cover: String,
    gender: Number,
    birthday: String,
    location: String,
    counts: Array,
    status: Number,
    create_time: Number,
    relation: String,
    status_verify: String,
    data_source: String
});

// Compile model from schema
var SomeModel = mongoose.model('User', SomeModelSchema);

module.exports = SomeModel;

module.exports.get = function (callback, keyword, page, limit) {
    let condition = {};
    if (keyword != null) {
        condition = {
            "display_name": new RegExp(
                "^" + keyword + ".*",
                "i"
            )
        };
    }
    console.log(condition);
    SomeModel.find(condition, callback).skip(page * limit).limit(limit);
}

module.exports.total = (keyword, callback) => {
    let condition = {};
    if (keyword != null) {
        condition = {
            "display_name": new RegExp(
                "^" + keyword + ".*",
                "i"
            )
        };
    }
    SomeModel.countDocuments(condition, callback);
}