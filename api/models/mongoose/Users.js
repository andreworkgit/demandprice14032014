

module.exports = function (mongoose){ 
	//if(mongoose.connection.readyState)
	//	mongoose.connection.close();
	
	//mongoose.connect(this.sails.config.adapters.mongoose.url);
	//console.dir(mongoose.models.users);
	
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

	return UsersSchema;
		//var modelComplete = mongoose.model('users', UsersSchema);
		
};


