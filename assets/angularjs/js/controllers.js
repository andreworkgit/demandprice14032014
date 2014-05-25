'use strict';

/* Controllers */

angular.module('NcBox.controllers', []).
run(function($rootScope, projetosService, usersService, $location) {
    $rootScope.lista = function(cal){
		var result = projetosService.lista(
			{},
			{},
			function(res){
				$rootScope.projetos = res.projeto;
				return (cal != undefined) ? cal() : true;
			},
			function(res){
				$rootScope.projetos = {};
				return (cal != undefined) ? cal() : true;
				//console.dir(res.data.ValidationError);
			}
		);
	}

	$rootScope.logado = function(pag){
		usersService.logado(
			function(res){
				if(!res.result){
					$location.url('/');
				}else{
					if(pag == 'Home'){
						$location.url('/projetos');
					}else{
						$rootScope.user = res.data;
					}
				}
			}
		);
	}

	$rootScope.logoff = function(){usersService.logoff(function(res){$location.url('/');});}
}).
controller('Home', ['$scope','$location', '$rootScope', 'usersService', function($scope, $location, $rootScope, usersService){
	$scope.login = function(){
		var params = {email: $scope.loginemail, password: $scope.loginsenha}
		var result = usersService.login(
			{},
			params,
			function(res){
				$location.url('/projetos');
			},
			function(res){
				$scope.errorlogin = 'Login invalido';
			}
		);
	}

	$scope.popup = function(link, titulo){
	  var width = 500,  height = 270;

	  var screenX  = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
	         screenY  = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
	         outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
	         outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
	         left  = parseInt(screenX + ((outerWidth - width) / 2), 10),
	         top   = parseInt(screenY + ((outerHeight - height) / 2.5), 10),
	         features = ('width='+ width +',height='+ height +',left=' + left +',top=' + top);

	  window.open(link, titulo, features);
	 }

	$scope.redire = function(url){
		window.location.href = '/'+url;
		//$location.url('/'+url);
	}

	$scope.cadastro = function(item){
		if(item != undefined){

			var params = {
				firstname: item.firstname, 
				lastname: item.lastname, 
				email: item.email, 
				password: item.password,
				//projetos: [{projeto: [{nome: 'qqq'}]}]	
			}

			var result = usersService.create(
				{},
				params,
				function(res){
					if(res.erro){
						alert(res.erro);
					}else{
						$location.url('/projetos');
					}
				},
				function(res){
					console.dir(res.data.ValidationError);
				}
			);
		}
	}

	$rootScope.logado('Home');
}]).
controller('Projetos', ['$scope','$rootScope','$location', 'usersService','projetosService', function($scope, $rootScope, $location, usersService,projetosService){
	
	$rootScope.logado('Proejtos');

	$scope.parte = '/angularjs/partials/listaProjetos.html';
	$rootScope.lista();

	$scope.includeNewProjeto = function(){
		$scope.item = '';
		$scope.ngNewProjeto = '/angularjs/partials/newProjeto.html';
	}

	$scope.includeEditProjeto = function(index){
		$scope.ngNewProjeto = '/angularjs/partials/editProjeto.html';
		$scope.item = {
			id: $scope.projetos[index].id,
			nome: $scope.projetos[index].nome,
			descricao: $scope.projetos[index].descricao
		};

		usersService.listarall(
			{},
			{},
			function(res){
				//console.log(res.projeto);
				$scope.usersl = res.users;
				$scope.userl = $scope.usersl[2];
			}
		);
	}

	$scope.lista = function(){
		var result = projetosService.lista(
			{},
			{},
			function(res){
				//console.log(res.projeto);
				$scope.projetos = res.projeto;
			},
			function(res){
				//console.dir(res.data.ValidationError);
			}
		);
	}

	$scope.cadastro = function(item){
		if(item != undefined){

			var params = {
				nome: item.nome, 
				descricao: item.descricao
			}

			var result = projetosService.create(
				{},
				params,
				function(res){

					if(res.err){
						alert(res.err);
					}else{
						//console.log(res.projeto);
						$rootScope.lista();
						//$location.url('/projetos');
						$scope.ngNewProjeto = '';
					}
					
				},
				function(res){
					//console.dir(res.data.ValidationError);
				}
			);
		}
	}

	$scope.del = function(id){
		var result = projetosService.del(
			{},
			{id: id},
			function(res){
				$rootScope.lista();
			}
		);
	}

	$scope.editar = function(item){

		//console.dir(item);

		var result = projetosService.edit(
			{},
			item,
			function(res){
				$rootScope.lista();
				$scope.ngNewProjeto = '';
			}
		);
	}

    $scope.disabled = false;
    $scope.upload = function(content) {
		$scope.uploadResponse = content.msg;
    }

}]).
controller('Projeto', 
['$scope','$rootScope','$location', '$routeParams','projetosService', 
function($scope, $rootScope, $location, $routeParams, projetosService){
	$rootScope.logado('Projeto');

	if($rootScope.projetos == undefined){
		 $rootScope.lista(function(){
		 	 $scope.projeto = $rootScope.projetos[$routeParams.index - 1];
		 });
	}else{
		$scope.projeto = $rootScope.projetos[$routeParams.index - 1];
	}

	$scope.parte = '/angularjs/partials/projeto.html';
	
	$scope.includeNewMusica = function(){
		$scope.item = '';
		$scope.ngNewMusica = '/angularjs/partials/newMusica.html';
	}

	$scope.disabled = false;
    $scope.upload = function(content) {
    	$scope.ngNewMusica = '';
		$scope.uploadResponse = content.msg;
		$rootScope.lista(function(){
			$scope.projeto = $rootScope.projetos[$routeParams.index - 1];
		});
    }
}]).
controller('FrontAuth', ['$scope',function($scope){

	$scope.alerta = function (){
		window.opener.location ="/projetos";
		window.close();
	}
	
}]).
controller('Home2', ['$scope','produtosService',function($scope,produtosService){

}]).
controller('DashBoard', ['$scope','produtosService',function($scope,produtosService){

	//$scope.parte = '/angularjs/partials/dashboard/ListaProdutos.html';

	$scope.alerta = function (){
		window.opener.location ="/projetos";
		window.close();
	}

	$scope.user = {};

	$scope.submitForm = function(valida){

		if(valida){
			$scope.user.enviado = 1;
			produtosService.sendEmail(
				{},
				$scope.user,
				function(res){
					//console.log("resposta >>> ",res);
					if(res.result){
						bootbox.alert({
				          message: "Obrigado <br> Logo entraremos em contato para apresentar os melhores imóveis para você.",
				        });
				        $scope.user = {};
					}else{
						bootbox.alert({
				          message: "Ocorreu um erro ao enviar os dados, por favor envie novamente.",
				        });
				        $scope.user.enviado = 0;
					}
				},
				function(res){
					console.dir(res.data.ValidationError);
				}
			);

		}

	}

	$scope.clickButton = function(){
		$scope.user.enviado = true;
	}

	$scope.startJquery = function(){
		//jQuery('.bs-component [data-toggle="popover"]').popover();
	  function formatReal( int )
      {
              var tmp = int+'';
              tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
              if( tmp.length > 6 )
                      tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
       
              return tmp;
      }

	  jQuery("#slider-example2").slider({
        range: true,
        min: 25000000,
        max: 300000000,
        values: [29000000, 100000000],
        slide: function(event, ui) {
          //$('#vlr_min').val(ui.values[0]);
          //$('#vlr_max').val(ui.values[1]);

          $scope.user.vlmin = ui.values[0];
      	  $scope.user.vlmax = ui.values[1];

          return jQuery("#slider-example2-amount").text("(Mínimo) R$ " + formatReal(ui.values[0]) + " - (Máximo) R$ " + formatReal(ui.values[1]));
        }
      });

      $scope.user.vlmin = $("#slider-example2").slider("values", 0);
      $scope.user.vlmax = $("#slider-example2").slider("values", 1);
      
      
      jQuery("#slider-example2-amount").text("(Mínimo) R$ " + $("#slider-example2").slider("values", 0) + " - (Máximo) R$ " + $("#slider-example2").slider("values", 1));
	}

	$scope.stores = [];

	$scope.addstore = function(index){
		console.log($scope.produtos[index])
	}

	$scope.txt_busca = false;

	$scope.target = "_blank";

	$scope.loading_table = false;
	$scope.loading_img =true;
	$scope.loading_img_td = [];

	$scope.liststores = function(index){
		//console.log($scope.produtos[index])
		
		if($scope.produtos[index].link_loja){
			$scope.loading_img_td[index] = true;
			$scope.target = "";
			var params = {ref: $scope.produtos[index].link_loja}
			var result = produtosService.liststore(
				{},
				params,
				function(res){
					$scope.loading_img_td[index] = false;
					//console.log(res.dados);
					$scope.stores[index] = res.dados;
				},
				function(res){
					//console.dir(res.data.ValidationError);
				}
			);
		}else{
			$scope.target = "_blank";
		}
	}

	//$scope.listar();

	$scope.listar = function(busca){

		if(busca){
			$scope.txt_busca = 'Adicionar: ' + busca;
		}

		$scope.loading_table = false;
		$scope.loading_img 	 = true;

		var params = {q: busca}
		var result = produtosService.listar(
			{},
			params,
			function(res){
				$scope.loading_table = true;
				$scope.loading_img =false;
				//console.log(res.dados);
				$scope.produtos = res.dados;
			},
			function(res){
				//console.dir(res.data.ValidationError);
			}
		);
	}
	
}]).
controller('Notfound', [function(){
	
}]);
