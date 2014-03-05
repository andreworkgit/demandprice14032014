var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ncbox');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
	firstname	: String,
	lastname	: String,
	email		: String,
	password	: String
});

exports.Users = mongoose.model('Users', UsersSchema);