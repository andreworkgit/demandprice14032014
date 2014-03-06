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



module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ProjetosController)
   */

  	_config: {},

  	createprojeto: function(req, res, next){
		ModelUsers.findById(req.param('id'), function(err, rs){
			if(err){
				return res.end(err);
			}

			projeto = {
				nome: req.param('nome'),
				descricao: req.param('descricao')
			};

			rs.projetos.push(projeto);
			rs.save(function(err){
				if(err){
					res.json(err);
				}else{
					res.json(rs);
				}
			});
		});
	},
	editprojeto: function(req, res, next){
		var where = {projetos:{$elemMatch: {"_id": req.param('id')}}};
		var dados = {
		    $set: {
		        "projetos.$.nome": req.param('nome'),
		        "projetos.$.descricao": req.param('descricao')
		    }
		}

		ModelUsers.update(where, dados, function(err, rs){
			if(err){
				return res.end(err);
			}

			res.json(rs);
		});
	},

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
		
		console.log('create projeto '+ req.session.user.id);
		callModel('users').find({_id: req.session.user.id }, function (err, user) {
			console.log(err);
			console.log(user);
			//res.json({projeto: user});
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
		//console.dir(this.sails);
		//console.dir(Users);

		Users.mongoose(function (model){
			model.find({}, function (err, user) {
					//console.log(err);
					//console.log(user);
					res.json({projeto: user});
			});
		});
		
		
		/*Users.native(function (err, collection) {
			var result = collection.find({}).toArray( function(err,array){
				console.log(array);
			} );
			console.log(result);
		})*/
	}

  
};
