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
controller('Notfound', [function(){
	
}]);
