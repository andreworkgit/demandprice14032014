module.exports = function (mongoose){ 
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
		nome		: String,
		descricao	: String
	}, schemaOptions);
	
	var UsersSchema = new Schema({
		firstname 	: String,
		lastname 	: String,
		email  		: String,
		password 	: String,
		projetos  	: [ProjetoSchema]
	});
	
	return UsersSchema;
};
