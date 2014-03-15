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
        var https = require('https');
        var http = require('http');


        function download(url, callback) {
          https.get(url, function(res) {
            var data = "";
            res.on('data', function (chunk) {
              data += chunk;
            });
            res.on("end", function() {
              callback(data);
            });
          }).on("error", function() {
            callback(null);
          });
        }
        var cheerio = require("cheerio");
        var url = "https://www.google.com.br/search?q=Smartphone+LG+Optimus+L3+II+Desbloqueado&ie=UTF-8&prmd=ivns&source=univ&tbm=shop&tbo=u&sa=X&tbs=vw:l,p_ord:p&ei=W6EjU8vJJIe2kAeu8oDgDA&ved=0CHsQsxg";
        

        //var url = "https://www.google.com.br/search?q=Smartphone+LG+Optimus+L3+II+Desbloqueado&oq=Smartphone+LG+Optimus+L3+II+Desbloqueado&aqs=chrome..69i57j69i61.496j0j9&sourceid=chrome&espv=210&es_sm=122&ie=UTF-8#q=Smartphone+LG+Optimus+L3+II+Desbloqueado&tbm=shop&tbs=vw:l,p_ord:p";
        //var url = "http://www.dailymail.co.uk/news/article-2297585/Wild-squirrels-pose-charming-pictures-photographer-hides-nuts-miniature-props.html";

        download(url, function(data) {
          if (data) {
            //console.log(data);
            
            var dados_produtos = [];

            var $ = cheerio.load(data);

            console.log($("#ires > ol > li.g").length);
            var c = 0;

            $("#ires > ol > li.g").each(function(i, e) {
                console.log($(e).find("div._zd").html());
                dados_produtos[c] = { 
                                        titulo: $(e).find("div._Li").find("h3.r").find("a").html(), 
                                        price: $(e).find("div._zd").find("b").html(), 
                                        loja:  $(e).find("div._zd").find("cite").html()
                                    };
                c++;
                //console.log($(e).attr("src"));
              });
            console.dir(dados_produtos.length);
            console.dir(dados_produtos);
            console.log($("#center_col > div.sd").html());
            console.log("done");
            res.json({dados:dados_produtos});
            //res.end(data);
            

          }
          else console.log("error");  
        });


        
       /* http.get("https://www.google.com.br/search?q=Smartphone+LG+Optimus+L3+II+Desbloqueado&ie=UTF-8&prmd=ivns&source=univ&tbm=shop&tbo=u&sa=X&ei=W6EjU8vJJIe2kAeu8oDgDA&ved=0CHsQsxg", function (result) {
        //http.get("https://www.google.com.br/search?q=Smartphone+LG+Optimus+L3+II+Desbloqueado&oq=Smartphone+LG+Optimus+L3+II+Desbloqueado#q=Smartphone+LG+Optimus+L3+II+Desbloqueado&tbm=shop&tbs=vw:l", function (result) {
            result.on('data', function (chunk) {
                //console.log(chunk);
                process.stdout.write(chunk);
                res.write(chunk);
            });
            result.on('end', function () {
                res.end();
            });
        });*/

        //res.json({teste: "forever5"});
                
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
                //console.log('rota facebook');
                //console.log(user);

                req.session.logado = true;
                req.session.cookie.maxAge = 86400000 * 28;
                req.session.user = user;
                req.session.save();
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
                req.session.logado = true;
                req.session.cookie.maxAge = 86400000 * 28;
                req.session.user = user;
                req.session.save();
                res.redirect('/auth/front');
            })(req, res);
    },

    'facebook/callback': function (req, res) {
        passport.authenticate('facebook',
            function (req, res) {
                res.redirect('/auth/front');
            })(req, res);
    },

    'google/callback': function (req, res) {
        passport.authenticate('google',
            function (req, res) {
                res.redirect('/auth/front');
            })(req, res);
    }





};