var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    id_user:String,
    id_chat:String,
    username:String,
    display_name:String,
    avatar:String,
    cover:String,
    gender:Number,
    birthday:String,
    location:String,
    counts:Array,
    status:Number,
    create_time:Number,
    relation: String,
    status_verify:String,
    data_source:String
});

// Compile model from schema
var SomeModel = mongoose.model('User', SomeModelSchema );
module.exports = SomeModel;