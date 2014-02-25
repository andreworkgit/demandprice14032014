/**
 * Model Users
 */

module.exports = {

  schema: true,

  attributes: {

  	nome: {
  		type: "string",
  		required: true
  	},

  	email: {
  		type: "string",
  		email: true,
  		required: true,
  		unique: true
  	},

  	senha: {
  		type: "string"
  	}
    
  }

};
