/**
 * AuthController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
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

var passport = require('passport');

module.exports = {

        /**
    * Overrides for the settings in `config/controllers.js`
    * (specific to AuthController)
    */
    _config: {},

    index: function (req, res) {
        res.view();
    },

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },

    ncgit: function(req, res) {
        //var sys = require('sys')
        var exec = require('child_process').exec;
        exec("git pull origin dev", function (error, stdout, stderr) { 
            //sys.puts(stdout); 
            //res.json({error: error,cmderror: stderr,cmdsuccess: stdout});
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(error+stderr+stdout);

        });
        
    },

    ncrs: function(req, res) {
        //var sys = require('sys')
        var exec = require('child_process').exec;
        exec("forever restart X8Ko", function (error, stdout, stderr) { 
            //sys.puts(stdout); 
            //res.json({error: error,cmderror: stderr,cmdsuccess: stdout});
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(error+stderr+stdout);
        });
        
    },

    ncdual: function(req, res) {
        //var sys = require('sys')
        var exec = require('child_process').exec;
        exec("git pull origin dev; forever restart X8Ko", function (error, stdout, stderr) { 
            //sys.puts(stdout); 
            //res.json({error: error,cmderror: stderr,cmdsuccess: stdout});
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(error+stderr+stdout);
        });
        
    },

    nclog: function(req, res) {
        //var sys = require('sys')
        var exec = require('child_process').exec;
        exec("cat /root/.forever/X8Ko.log", function (error, stdout, stderr) { 
            //sys.puts(stdout); 
            //res.json({error: error,cmderror: stderr,cmdsuccess: stdout});
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(error+stderr+stdout);
        });
        
    },

     teste5: function(req, res) {
        res.json({teste: "forever5"});
                
    },

    // http://developer.github.com/v3/
    // http://developer.github.com/v3/oauth/#scopes
    github: function (req, res) {
        passport.authenticate('github', { failureRedirect: '/login' },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        console.log(err);
                        res.view('500');
                        return;
                    }

                    res.redirect('/');
                    return;
                });
            })(req, res);
    },

    // https://developers.facebook.com/docs/
    // https://developers.facebook.com/docs/reference/login/
    facebook: function (req, res) {
        passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] },
            function (err, user) {
                console.log('rota facebook');
                console.log(user);

                req.session.logado = true;
                req.session.cookie.maxAge = 86400000 * 28;
                req.session.user = user;
                req.session.save();

               /* window.opener.location ="/projetos";
                window.close();
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('exec');*/

                res.redirect('/auth/front');
                /*req.logIn(user, function (err) {
                    if (err) {
                        console.log(err);
                        res.view('500');
                        return;
                    }

                    res.redirect('/');
                    return;
                });*/
            })(req, res);
    },

    // https://developers.google.com/
    // https://developers.google.com/accounts/docs/OAuth2Login#scope-param
    google: function (req, res) {
        passport.authenticate('google', { failureRedirect: '/login', scope:['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        console.log(err);
                        res.view('500');
                        return;
                    }

                    res.redirect('/');
                    return;
                });
            })(req, res);
    },

    'facebook/callback': function (req, res) {
        passport.authenticate('facebook',
            function (req, res) {
                console.log('rota facebook/callback');
                //res.json({resposta: "ok"});
                res.redirect('/projetos');
            })(req, res);
    }





};