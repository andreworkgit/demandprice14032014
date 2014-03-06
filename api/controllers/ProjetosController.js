/**
 * ProjetosController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
 var callModel = function (name){
   	return require('../models/mongoose/'+name+'.js')(Users.adapter.config);
 };

module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ProjetosController)
   */
  _config: {},

	create: function(req, res, next){
		var ObjectID = require('mongodb').ObjectID;
		var idObj = new ObjectID(req.session.user.id);

		var params = {
			nome: req.param('nome'),
			descricao: req.param('descricao')
			//user_id : [idObj]
		}	

		/*var params = {
			projetos: [{lista: [{nome: req.param('nome'), descricao: req.param('descricao')}]}]
		}*/
		//console.log(params);
		Users.findOrCreate({id: idObj},params, function (err, projeto){
			if(err){
				res.json(err);
				res.writeHead(400);
			}else if(projeto){
				res.json({projeto: projeto});
			}
		});



		/*Projetos.create(params, function (err, projeto){
			if(err){
				res.json(err);
				res.writeHead(400);
			}else if(projeto){
				res.json({projeto: projeto});
			}
		});*/
	},

	lista: function(req, res, next){
		
		callModel('users').find({}, function (err, user) {
			console.log(err);
			console.log(user);
			res.json({projeto: user});
		});
		
		
		/*Users.native(function (err, collection) {
			var result = collection.find({}).toArray( function(err,array){
				console.log(array);
			} );
			console.log(result);
		})*/

		

	}

  
};
