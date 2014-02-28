'use strict';

/* Controllers */

angular.module('NcBox.controllers', []).
controller('Home', ['$scope','$location', 'usersService', function($scope, $location, usersService){
	$scope.login = function(){
		var params = {email: $scope.loginemail, password: $scope.loginsenha}
		var result = usersService.login(
			{},
			params,
			function(res){
				$location.url('/perfil');
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
				password: item.password
			}

			var result = usersService.create(
				{},
				params,
				function(res){
					$location.url('/perfil');
				},
				function(res){
					console.dir(res.data.ValidationError);
				}
			);
		}
	}

	$scope.logado = function(){
		usersService.logado(
			function(res){
				if(!res.result){
					$location.url('/');
				}else{
					$location.url('/perfil');
				}
			}
		);
	}
}]).
controller('Perfil', ['$scope','$location', 'usersService', function($scope, $location, usersService){
	$scope.logado = function(){

		usersService.logado(
			function(res){
				if(!res.result){
					$location.url('/');
				}else{
					$scope.user = res.data;
				
				}
			}
		);
	}


	$scope.newShow = false;

	$scope.parte = 'angularjs/partials/listaProjetos.html';
	$scope.projetos = [
		{nome: 'projeto1', descricao: 'descricao1'},
		{nome: 'projeto2', descricao: 'descricao2'},
		{nome: 'projeto3', descricao: 'descricao3'},
		{nome: 'projeto4', descricao: 'descricao4'},
		{nome: 'projeto5', descricao: 'descricao5'},
	];
	
	$scope.includeNewProjeto = function(){
		$scope.ngNewProjeto = 'angularjs/partials/newProjeto.html';
	}

	$scope.newProjeto = function(item){
		$scope.projetos.push(item);
		$scope.ngNewProjeto = '';
	}

	/*$scope.musica = {nome: 'musica teste 2', artista: 'artista teste 2'}

	$scope.parte2 = 'angularjs/partials/parte2.html';
	$scope.teste2 = 'parte2';*/

}]);