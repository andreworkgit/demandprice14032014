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
		nome		: { type: String, unique: true, required: true },
		descricao	: String,
		curtiu		: Array
	}, schemaOptions);

	//ProjetoSchema.path('nome').index({ unique: true });
	
	var UsersSchema = new Schema({
		firstname 	: String,
		lastname 	: String,
		email  		: { type: String, unique: true },
		password 	: String,
		projetos  	: [ProjetoSchema]
	});
	return UsersSchema;
};