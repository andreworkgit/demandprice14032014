/**
 * UsersController
 */

module.exports = {
    
	_config: {},
	listar: function(req, res, next){
		Users.mongoose(function (model){
			model.find({}, function(err, rs){
				//console.dir(rs);
				res.json(rs);
			});
		});
	},

	teste: function(req,res,next){
		next();
	},

	listarall: function(req,res,next){

		Users.mongoose(function (model){
			model.find({}, function(err, rs){
				//console.dir(rs);
				res.json({users: rs});
			});
		});
		
	},
	create: function(req, res, next){
		if(req.body.password == undefined || req.body.email == undefined){
			res.writeHead(400);
			req.session.logado = false;
			req.session.save();
			res.json({error: 'invalid'});
		}
		
		require('bcrypt-nodejs').hash(req.body.password, null, null, function(err, hash) {
			Users.mongoose(function (model){
				
				model.findOne({ email: req.body.email}, function (err,userm){

					if(err){
						res.json({erro: err});
					}else if(!userm){
						var user = new model({
							firstname : req.body.firstname,
							lastname : req.body.lastname,
							email : req.body.email,
							password : hash
						});

						user.save(function(err){
							if(err){
								res.writeHead(400);
								req.session.logado = false;
								req.session.save();
								res.json(err);
							}else if(user){
								delete user.password;
								req.session.logado = true;
								req.session.cookie.maxAge = 86400000 * 28;
								req.session.user = user;
								req.session.save();
								res.json(user);
							}
						});
						
					}else{
						//res.writeHead(400);
						res.json({erro: "email ja existe"});
					}

				})
				
			});
		});
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
			model.findOne({email: req.param('email')}, function(err, user){
				if(err){
					res.json(err);
					res.writeHead(400);
				}else if(user){
					require('bcrypt-nodejs').compare(req.param('password'), user.password, function (err, valid) {
				    	if(err || !valid){
							res.writeHead(400);
							res.end('Login Invalido22');
						}else{
							delete user.password;
							req.session.logado = true;
							req.session.cookie.maxAge = 86400000 * 28;
							req.session.user = user;
							req.session.save();
							res.json({result: 'ok'});
						}
				    });
				}else{
					res.writeHead(400);
					res.end('Login Invalido');
				}
			});

		});
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
	}
};
