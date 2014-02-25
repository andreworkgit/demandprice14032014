/**
 * UsersController
 */

module.exports = {
    
	_config: {},

	create: function(req, res, next){
		Users.create(req.params.all(), function (err, user){
			if(err){
				console.log(err);
				req.session.flash = {
					err: err
				}

				res.locals.flash = _.clone(req.session.flash);

				//return res.redirect('/user/new');
			}

			res.json(user);
			req.session.flash = {};
		});
	}
};
