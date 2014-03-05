/**
 * UsersController
 */
var ModelUsers = require('../models/mongoose/Users.js').Users;
module.exports = {
    
	_config: {},
	listar: function(req, res, next){
		ModelUsers.find({}, function(err, rs){
			console.dir(rs);
			res.json(rs);
		});
	},
	create: function(req, res, next){
		user = ModelUsers();
		user.firstname = req.body.firstname;
		user.lastname = req.body.lastname;
		user.email = req.body.email;
		user.password = req.body.password;

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

		Users.findOneByEmail(req.param('email'), function(err, user){
			if(err){
				res.json(err);
				res.writeHead(400);
			}else if(user){
				require('bcrypt-nodejs').compare(req.param('password'), user.password, function (err, valid) {
			    	if(err || !valid){
						res.writeHead(400);
						res.end('Login Invalido');
					}else{
						req.session.logado = true;
						req.session.cookie.maxAge = 86400000 * 28;
						req.session.user = user.toJSON();
						req.session.save();
						res.json({result: 'ok'});
					}
			    });

			    //res.json(user);
			}else{
				res.writeHead(400);
				res.end('Login Invalido');
			}
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
	},
	createprojetos: function(req, res, next){
		
	}
};
