/**
 * UsersController
 */

module.exports = {
    
	_config: {},

	create: function(req, res, next){
		Users.create(req.params.all(), function (err, user){
			if(err){
				res.json(err);
				res.writeHead(400);
				req.session.logado = false;
			}else if(user){
				//req.session.user = user;
				req.session.logado = true;
				res.json(user);
			}
		});
	},
	login: function(req, res, next){
		req.session.logado = false;
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
						res.end('ok');
						req.session.logado = true;
						//req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
						//req.session.cookie.maxAge = 9000000;
						req.session.cookie.maxAge = 86400000 * 28;
						req.session.save();
					}
			    });

			    //res.json(user);
			}else{
				res.writeHead(400);
				res.end('Login Invalido');
			}
		});
	},
	logado: function(req, res, next){
		if(req.session.logado && req.session.logado != undefined){
			res.json({result: true});
		}else{
			res.json({result: false});
		}
	}
};
