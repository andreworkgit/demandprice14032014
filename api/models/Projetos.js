/**
 * Projetos
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  	
  	schema: true,

  	attributes: {
	    nome: {
	      type: "string"
	    },
	    descricao: {
	      type: "string"
	    },
      user_id : {
        type: "array"
      }


  	},

  	/* e.g.
  	nickname: 'string'
  	*/
    
};
