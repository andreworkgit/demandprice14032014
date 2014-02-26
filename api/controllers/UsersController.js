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
			}else{
				res.json(user);
			}
		});
	}
};
