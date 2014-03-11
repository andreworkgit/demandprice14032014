'use strict';

/* Controllers */

angular.module('NcBox.controllers', []).
run(function($rootScope, projetosService, usersService, $location) {
    $rootScope.lista = function(cal){
		var result = projetosService.lista(
			{},
			{},
			function(res){
				console.log(res.projeto);
				$rootScope.projetos = res.projeto;
				return (cal != undefined) ? cal() : true;
			},
			function(res){
				$rootScope.projetos = {};
				return (cal != undefined) ? cal() : true;
				//console.dir(res.data.ValidationError);
				//return call();
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

	$scope.parte = 'angularjs/partials/listaProjetos.html';

	$scope.includeNewProjeto = function(){
		$scope.item = '';
		$scope.ngNewProjeto = 'angularjs/partials/newProjeto.html';
	}

	$scope.includeEditProjeto = function(index){
		$scope.ngNewProjeto = 'angularjs/partials/editProjeto.html';
		$scope.item = {
			id: $rootScope.projetos[index].id,
			nome: $rootScope.projetos[index].nome,
			descricao: $rootScope.projetos[index].descricao
		};;
	}

	$rootScope.lista();

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
['$scope','$rootScope','$location', '$routeParams', 'usersService','projetosService', 
function($scope, $rootScope, $location, $routeParams, usersService,projetosService){
	$rootScope.logado('Projeto');

	if($rootScope.projetos == undefined){
		 $rootScope.lista(function(){
		 	 $scope.projeto = $rootScope.projetos[$routeParams.index - 1];
		 });
	}else{
		$scope.projeto = $rootScope.projetos[$routeParams.index - 1];
	}

	$scope.parte = 'angularjs/partials/projeto.html';
	
	$scope.includeNewMusica = function(){
		$scope.item = '';
		$scope.ngNewMusica = 'angularjs/partials/newMusica.html';
	}
}]);