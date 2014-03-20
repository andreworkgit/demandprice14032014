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

  	listsubstores: function(req, res, next){

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
          		//console.log($(e).find("td.os-seller-name").find("a").html());

          		data_store_price[c] = { 
                                        loja:  loja,
                                        price: price,
                                        link: link
                                    };
                c++;


          	});
          	console.log(data_store_price);
          	res.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});//';charset=iso-8859-1'
            res.end(body);

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

        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
           // console.log(response.headers);

            var dados_produtos = [];

            var $ = cheerio.load(body);

            //console.log($("#main").find("#ires > ol > li.g").length);
            

            //console.log($("#div.ires > ol > li").length);
            var c = 0;

            $("#main").find("#ires > ol > li.g").each(function(i, e) {
               // console.log($(e).find("div._zd").html());

                var price = $(e).find("div.pslmain").find("span._Am > b").html();

                if(price == null){
                    price = $(e).find("div.pslmain").find("span.price > b").html()
                }
                var link = "";
                var loja = $(e).find("div.pslmain").find("div._et > div > span").remove();
                loja = str_replace(' de ','',$(e).find("div.pslmain").find("div._et > div").html());
                
                if(loja == 'null'){
                	$(e).find("div.pslmain").find("span.price").remove();
                	loja = $(e).find("div.pslmain").find("div._RH").html();

                	var link_split1 = $(e).find("div.pslmain").find("h3.r").find("a").attr('href').split("?");
                	var link_split2 = link_split1[0].split("/");
                	//console.log(link_split2);
                	link = link_split2[3];
                }
                //console.log("loja",loja);
                console.log("link",link);
                //loja.replace('/ de /gi,','');
                dados_produtos[c] = { 
                                        titulo: $(e).find("div.pslmain").find("h3.r").find("a").html(), 
                                        price: price, 
                                        loja:  loja,
                                        link: link
                                    };
                c++;
                //console.log($(e).attr("src"));
              });


           // console.log(dados_produtos);


            //console.log(body);
            res.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});//';charset=iso-8859-1'
            res.end(body);
            //res.json({dados:dados_produtos});
            
            //console.log(body) // Print the google web page.
          }
        })
	
	}  
};
