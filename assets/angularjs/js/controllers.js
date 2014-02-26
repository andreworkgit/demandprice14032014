'use strict';

/* Controllers */

angular.module('NcBox.controllers', []).
	controller('Home', ['$scope','$location', 'usersService', function($scope, $location, usersService){
		$scope.login = function(){
			if($scope.loginemail == 'teste@teste.com' && $scope.loginsenha == '123'){
				$location.url('/view2');
			}else{
				$scope.errorlogin = 'Login invalido';
			}
		}

		$scope.cadastro = function(item){ 
			//console.dir(usersService);

			var result = usersService.create(
				{},
				{firstname: item.firstname, lastname: item.lastname, email: item.email, password: item.password},
				function(res){
					$location.url('/view2');
				},
				function(res){
					console.dir(res.data.ValidationError);
				}
			);

			//console.log(result);
		}
	}])
	.controller('MyCtrl2', [function() {

 	}]);