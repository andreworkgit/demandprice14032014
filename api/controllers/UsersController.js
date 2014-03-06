/**
 * UsersController
 */

module.exports = {
    
	_config: {},
	listar: function(req, res, next){

		//console.dir(this.sails.models.mongoose.users);
		console.dir(this.sails);


		ModelUsers.find({}, function(err, rs){
			console.dir(rs);
			res.json(rs);
		});
	},
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
		user = ModelUsers();
		user.firstname = req.param('firstname');
		user.lastname = req.param('lastname');
		user.email = req.param('email');
		user.password = req.param('password');

		Users.mongoose(function (model){

			var user = new model({

				firstname : req.body.firstname,
				lastname : req.body.lastname,
				email : req.body.email,
				password : req.body.password

			});
			
			user.save(function(err){
				if(err){
					res.writeHead(400);
					req.session.logado = false;
					req.session.save();
					res.json(err);
				}else if(user){
					req.session.logado = true;
					req.session.cookie.maxAge = 86400000 * 28;
					req.session.user = user;
					req.session.save();
					res.json(user);
				}
			});

		});


		/*Users.create(req.params.all(), function (err, user){
			if(err){
				res.json(err);
				res.writeHead(400);
				req.session.logado = false;
				req.session.save();
			}else if(user){
				//req.session.user = user;
				req.session.logado = true;
				req.session.cookie.maxAge = 86400000 * 28;
				req.session.user = user.toJSON();
				req.session.save();
				res.json(user);
			}
		});*/
	},
	login: function(req, res, next){
		req.session.logado = false;
		req.session.save();
		if(!req.param('email')){
			res.writeHead(400);
			res.end('Login Invalido');
			return false;
		}
		
		Users.mongoose(function (model){

			model.find({email: req.param('email')}, function(err, user){
				if(err){
					res.json(err);
					res.writeHead(400);
				}else if(user){
					/*require('bcrypt-nodejs').compare(req.param('password'), user.password, function (err, valid) {
				    	if(err || !valid){
							res.writeHead(400);
							res.end('Login Invalido22');
						}else{
							req.session.logado = true;
							req.session.cookie.maxAge = 86400000 * 28;
							req.session.user = user.toJSON();
							req.session.save();
							res.json({result: 'ok'});
						}
				    });*/

				    req.session.logado = true;
					req.session.cookie.maxAge = 86400000 * 28;
					req.session.user = user[0];
					req.session.save();
					res.json({result: 'ok'});

				    //res.json(user);
				}else{
					res.writeHead(400);
					res.end('Login Invalido');
				}
			});

		})
	},
	logoff: function(req, res, next){
		req.session.logado = false;
		delete req.session.user;
		req.session.save();
		res.json({result: true});
	},
	logado: function(req, res, next){
		if(req.session.logado && req.session.logado != undefined){
			//delete req.session.user.password;
			res.json({result: true, data: req.session.user});
		}else{
			res.json({result: false});
		}
	},
	createprojetos: function(req, res, next){
		
	}
};
