

module.exports = function (config){ 
	var mongoose = require('mongoose');
	mongoose.connect(config.url);
	var Schema = mongoose.Schema;
	var schemaOptions = {
	 toJSON: {
	   virtuals: true 
	 },
	 toObject: {
	   virtuals: true
	 }
	};

	var ProjetoSchema = new Schema({
	 nome  : String,
	 descricao : String
	}, schemaOptions);

	var UsersSchema = new Schema({
	 firstname : String,
	 lastname : String,
	 email  : String,
	 password : String,
	 projetos  : [ProjetoSchema]
	});

	return mongoose.model('users', UsersSchema);

};

/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ncbox');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
	firstname	: String,
	lastname	: String,
	email		: String,
	password	: String
});

exports.Users = mongoose.model('Users', UsersSchema);*/

