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
controller('Perfil', ['$scope','$location', 'usersService', '$templateCache', function($scope, $location, usersService, $templateCache){
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

	$templateCache.removeAll();
	$scope.parte = 'angularjs/partials/partial1.html';
	$scope.musica = {nome: 'musica teste 2', artista: 'artista teste 2'}
}]);