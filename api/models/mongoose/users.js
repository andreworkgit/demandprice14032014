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

	var MusicaSchema = new Schema({
		titulo		: String,
		artista		: String,
		url			: String
	}, schemaOptions);
	
	var VideosSchema = new Schema({
		ref			: { type: String, required: true},
		datereq		: { type: Date},
		created		: { type: Date, default: Date.now , required: true}
	}, schemaOptions);

	//ProjetoSchema.path('nome').index({ unique: true });
	
	var UsersSchema = new Schema({
		nome 		: String,
		firstname 	: String,
		lastname 	: String,
		email  		: { type: String, unique: true },
		password 	: String,
		google_id	: String,
		facebook_id	: String,
		username	: String,
		created		: {type: Date, default: Date.now},
		videos  	: [VideosSchema]
	});
	return UsersSchema;
};