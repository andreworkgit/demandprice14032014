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

  	create: function(req, res, next){
  		Users.mongoose(function (model){

			model.findById(req.session.user._id, function(err, rs){
				if(err){
					return res.end(err);
				}

				projeto = {
					nome: req.param('nome').toLowerCase(),
					descricao: req.param('descricao')
				};

				var result = 0;
				
				for (var i = 0; i < rs.projetos.length; i++) { 
				  if (rs.projetos[i].nome === projeto.nome) { 
				    result = 1;
				    break;
				  } 
				}

				if(result == 0){
					rs.projetos.push(projeto);
					rs.save(function(err){
						if(err){
							res.json(err);
						}else{
							res.json(rs);
						}
					});

				}else{
					res.json({err: "projeto já existe"})					
				}
			});
		});
	},
	edit: function(req, res, next){
		Users.mongoose(function (model){
			var where = {projetos:{$elemMatch: {"_id": req.param('id')}}};
			var dados = {
			    $set: {
			        "projetos.$.nome": req.param('nome'),
			        "projetos.$.descricao": req.param('descricao')
			    }
			}

			model.update(where, dados, function(err, rs){
				if(err){
					return res.end(err);
				}

				res.json(rs);
			});
		});
	},

	lista: function(req, res, next){
		//console.dir(this.sails);
		//console.dir(Users);

		Users.mongoose(function (model){
			model.findById(req.session.user._id, {projetos: 1}, function (err, result) {
					//console.log(err);
					//console.log(user);
					res.json({projeto: result.projetos});
			});
		});
		
		
		/*Users.native(function (err, collection) {
			var result = collection.find({}).toArray( function(err,array){
				console.log(array);
			} );
			console.log(result);
		})*/
	},
	delete: function(req, res, next){
		Users.mongoose(function (model){
			var where = {projetos:{$elemMatch: {"_id": req.param('id')}}};
			var dados = {$pull: {"projetos" : {"_id": req.param('id')}}}

			model.update(where, dados, function(err, rs){
				if(err){
					return res.end(err);
				}

				res.json(rs);
			});
		});
	},
	upload: function(req, res, next){
		//setTimeout(function () {		
			var fs = require('fs'), path = require('path');
			res.setHeader('Content-Type', 'text/html');
			if(req.files.file == undefined || req.files.length == 0 || req.files.file.size == 0)
				res.send({ msg: 'No file uploaded at ' + new Date().toString() });
			else{
				var file = req.files.file;
				
				var extensoes_validas = ['audio/mp3','audio/mpeg'];
				if(extensoes_validas.indexOf(file.headers['content-type']) < 0){
					res.send({ msg: 'não é um arquivo mp3'});
					return;
				}

				fs.readFile(file.path, function (err, data){
					var newPath = path.join(__dirname,"..","..","assets","uploads", file.name);
					fs.writeFile(newPath, data, function (err){
						if(err) 
							res.send({ msg: err});
						else{
							fs.unlink(file.path, function (err){
								if(err)
									res.send({ msg: 'erro no unlink'});
								else
									res.send({ msg: '<b>"' + file.name + '"</b> uploaded to the server '});
							});
						}
					});
				});
			}

		//},10000);
	}  
};
