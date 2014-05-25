/**
 * ProjetosController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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

var request = require('request');
var cheerio = require("cheerio");
var querystring = require('querystring');

module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ProjetosController)
   */

  	_config: {},

    sendemail: function(req, res, next){

      var nodemailer = require("nodemailer");

      // create reusable transport method (opens pool of SMTP connections)
      var smtpTransport = nodemailer.createTransport("SMTP",{
          service: "Gmail",
          auth: {

              user: "imoveisbr2.contato@gmail.com",
              pass: "824imo276"

             /* XOAuth2: {
                  user: "andrework@gmail.com" ,
                  clientId: "740383275630.apps.googleusercontent.com" ,
                  clientSecret: "NFUXXX1dBbN6Dle-8T8DWTRQ" ,
                  refreshToken: "1/fSsTG4iTsq-YAw2SKZEG8iUrRGng1xR7cZTvn3MGZBw" ,
                  accessToken: "ya29.1.AADtN_WXX691XPFCqsEn_Ht7Rw13eqd2FLU8hjnijTJDgbBE9PJDhe-1-u5eWUzAyhFp2A" ,
                  timeout: 3600
              }*/
          }
      });

      var content = "Segue minha solicitação: <br><br>Tipo: "+req.param('tipo')+" <br>Estado: "+req.param('estado')+" <br>Região: "+req.param('regiao')+" <br>Valor Mínimo: "+req.param('vlmin')+" <br>Valor Máximo: "+req.param('vlmax')+" <br>Nome: "+req.param('nome')+" <br>E-mail: "+req.param('email')+" <br>Telefone: "+req.param('telefone')+" <br><br>Por favor entrar em contato, com a proposta.";

      // setup e-mail data with unicode symbols
      var mailOptions = {
          from: "Contato Imovel <urelby@gmail.com>", // sender address
          to: "andrework@gmail.com,elis29811@gmail.com", // list of receivers
          subject: "Novo Contato Imóvel", // Subject line
          text: content, // plaintext body
          html: content // html body
      }

      // send mail with defined transport object
      smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
              //console.log(error);
              res.json({result:false,error:error});
          }else{
              //console.log("Message sent: " + response.message);
              res.json({result:true});

          }

          // if you don't want to use this transport object anymore, uncomment following line
          //smtpTransport.close(); // shut down the connection pool, no more messages
      });


    },

  	listsubstores: function(req, res, next){
      //114139354350728268
  		if(req.param('ref'))
  		{
  		var hostname = "https://www.google.com.br/shopping/product/"+req.param('ref')+"/online?sa=X&prds=scoring:p";
		var options = {
	        url: hostname,
	        headers: {
	            "host":"www.google.com.br",
	            'user-agent':'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36',
	        }
	    };
	    //var Entities = require('html-entities').AllHtmlEntities;
	    //var entities = new Entities();
	    request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {

          	var data_store_price = [];
          	var c = 0;
          	var $ = cheerio.load(body);

          	$("#os-sellers-table").find("tr.os-row").each(function(i, e) {
          		//$(e).find("td.os-seller-name").find("a").html();
          		var loja = $(e).find("td.os-seller-name").find("a").html();
          		var price = $(e).find("td.os-price-col").find("span.os-base_price").html();
          		var link = "";
          		var link_split1 = $(e).find("td.os-seller-name").find("a").attr('href').split('&adurl=');
              var link_split2 = unescape(link_split1[1]).split('&url=');

              var link_split3 = link_split2[1] ? link_split2[1] : link_split2[0];
              var link_split4 = unescape(link_split3).split('?');
              link = link_split4[0].replace(/google/gi, '');
              

          		data_store_price[c] = { 
                                        loja:  loja,
                                        price: price,
                                        link: link
                                    };
                c++;


          	});
          	//console.log(data_store_price);
          	//res.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});//';charset=iso-8859-1'
            //res.end(body);
            res.json({dados:data_store_price});

          }

        });
		}else{
			console.log("Entre com ref",req.param('ref'));
		}

  	},

  	listar: function(req, res, next){
  		
  		function str_replace(search, replace, subject, count) {
          //  discuss at: http://phpjs.org/functions/str_replace/
          //   example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
          //   returns 1: 'Kevin.van.Zonneveld'
          //   example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
          //   returns 2: 'hemmo, mars'

          var i = 0,
            j = 0,
            temp = '',
            repl = '',
            sl = 0,
            fl = 0,
            f = [].concat(search),
            r = [].concat(replace),
            s = subject,
            ra = Object.prototype.toString.call(r) === '[object Array]',
            sa = Object.prototype.toString.call(s) === '[object Array]';
          s = [].concat(s);
          if (count) {
            this.window[count] = 0;
          }

          for (i = 0, sl = s.length; i < sl; i++) {
            if (s[i] === '') {
              continue;
            }
            for (j = 0, fl = f.length; j < fl; j++) {
              temp = s[i] + '';
              repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
              s[i] = (temp)
                .split(f[j])
                .join(repl);
              if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
              }
            }
          }
          return sa ? s : s[0];
        }



        var hostname = "https://www.google.com.br";

        //console.log('veio do post',req.param('q'));

        var value_search = querystring.stringify({q: req.param('q')});

        //console.log('veio do post',req.param('q'),value_search);
        var search_default = "q=Smartphone+moto+g+dual+chip+16gb";
        
        if(value_search && req.param('q'))
            search_default = value_search;

        var options = {
            url: hostname+'/search?'+search_default+'&tbm=shop&tbs=vw:l,p_ord:p',
            headers: {
                "host":"www.google.com.br",
                'user-agent':'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36',
            }
        };

        //https://www.google.com.br/search?q=Smartphone+moto+g+dual+chip+16gb&tbm=shop&tbs=vw:l,p_ord:p

        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
           // console.log(response.headers);

            var dados_produtos = [];

            var $ = cheerio.load(body);

            //console.log($("#main").find("#ires > ol > li.g").length);
            
            var key_price = ['_Am','_vm'];
            var key_loja = ['_et','_vm'];
            var price,titulo;

            //console.log($("#div.ires > ol > li").length);
            var c = 0;

            $("#main").find("#ires > ol > li.g").each(function(i, e) {
               // console.log($(e).find("div._zd").html());

               /*key_price.forEach(function(value) {
                  price = $(e).find("div.pslmain").find("span."+value+" > b").html();
                  if(price){
                    console.log(value);
                    return true;
                  }  
                });*/
               titulo = $(e).find("div.pslmain").find("h3.r").find("a").html();
               titulo = str_replace('<em>','<b>',titulo);
               titulo = str_replace('</em>','</b>',titulo);
              
               price = $(e).find("div.pslmain").find("div.pslline").first().find("div > span > b").html();
               //console.log(price);

                if(price == null){
                    price = $(e).find("div.pslmain").find("span.price > b").html()
                }
                //formata link
                var link = false;
                link = $(e).find("div.pslmain").find("h3.r").find("a").attr('href');
                var link_split1 = link.split('&adurl=');
                var link_split2 = unescape(link_split1[1]).split('&url=');

                var link_split3 = link_split2[1] ? link_split2[1] : link_split2[0];
                var link_split4 = unescape(link_split3).split('?');
                link = link_split4[0].replace(/google/gi, '');

                //console.log('link',link);


                var loja = $(e).find("div.pslmain").find("div.pslline").first().find("div > div > span").remove();
                loja = $(e).find("div.pslmain").find("div.pslline").first().find("div > div").html();
                loja = str_replace(' de ','',loja).replace(/<[^>]+>/gm, '');




               // console.log('loja',loja.indexOf(" em mais "));
                var isstore = false;


                
                if(loja.indexOf(" em mais ") === 0 || loja.indexOf(" em ") === 0){
                  isstore=true;
                  loja = str_replace(' em mais ','+',loja);
                  loja = str_replace(' em ','+',loja);
                  
                	var link_split1 = $(e).find("div.pslmain").find("h3.r").find("a").attr('href').split("?");
                	var link_split2 = link_split1[0].split("/");
                	//console.log(link_split2);
                	var link_loja = link_split2[3];
                }

                if(link == 'undefined'){
                  link = '#';
                }
                //console.log("loja",loja);
               // console.log("link",link);
                //loja.replace('/ de /gi,','');
                dados_produtos[c] = { 
                                        titulo: titulo, 
                                        price: price, 
                                        loja:  loja,
                                        link_loja: link_loja,
                                        link: link,
                                        isstore: isstore
                                    };
                c++;
                //console.log($(e).attr("src"));
              });


           //console.log(dados_produtos);

           if(req.param('modo')){
            //console.log(body);
            res.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});//';charset=iso-8859-1'
            res.end(body);
          }else{
            res.json({dados:dados_produtos});
           } 
            //console.log(body) // Print the google web page.
          }
        })
	
	}  
};
