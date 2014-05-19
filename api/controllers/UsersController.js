/**
 * UsersController
 */

module.exports = {
    
	_config: {},
	pagseguro: function(req, res, next){
		var request = require('request');
		var _ = require('underscore');

		var token 	= "89104415F19443A69084FD13C2CC7E45";
    	var email 	= "andrework@gmail.com";
    	var code,mododev;

    	if(req.param('notificationCode')){
    		mododev = false;
    		code = req.param('notificationCode');
    	}else if(req.param('mododev')){
    		mododev = true;
    		code  	= "D2FCE566-CCB9-4733-98BA-7D5EBCCC38FB";
    	}

    	//https://ws.pagseguro.uol.com.br/v2/transactions/232CD979-18CF-4B98-9334-1DCFFB0D16F5?email=andrework@gmail.com&token=89104415F19443A69084FD13C2CC7E45
    
    	var hostname = "https://ws.pagseguro.uol.com.br/v2/transactions/" +code + "?email=" +email + "&token=" +token;
   
   		var options = {
	        url: hostname,
	        /*headers: {
	            "host":"www.google.com.br",
	            'user-agent':'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36',
	        }*/
	    };

	    
		request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
          	if(body){

          		var parseString = require('xml2js').parseString;
				//var xml = "<root>Hello xml2js!</root>"
				parseString(body, function (err, result) {
					if(err){ console.log(err); res.json({err:err}); }
				    //console.log('isXml >>',hostname);
				    //res.json({isxml:hostname});
				    if((mododev && result.transaction.status[0] == 1)|| (!mododev && result.transaction.status[0] == 3 && req.param('notificationCode'))){

				    	Users.mongoose(function (model){
				
							model.findOne({ _id: result.transaction.reference[0]}, function (err,user){
								if(err){ console.log(err); res.json({err:err}); }

								var checkExists = _.where(user.videos, {ref: result.transaction.items[0].item[0].id[0]});
								
								if(_.isEmpty(checkExists)){

									user.videos.push({
											ref: result.transaction.items[0].item[0].id[0],
											datereq: result.transaction.lastEventDate[0]
										});

									user.save(function(err){
										if(err){
											res.json({err:err});
										}else if(user){
											res.json({result:"OK"});
											//console.log("Videos add com sucesso");
										}
									});
									
								}

							});
						});

				    }

				});
          	}
          	
          }else{
          	res.json({error:error});
          }
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
