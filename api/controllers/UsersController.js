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
			}else if(user){
				res.json(user);
			}
		});
	},
	login: function(req, res, next){
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
					}
			    });

			    //res.json(user);
			}else{
				res.writeHead(400);
				res.end('Login Invalido');
			}
		});
	}
};
