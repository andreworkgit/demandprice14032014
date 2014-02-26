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
					$location.url('/view2');
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
						$location.url('/view2');
					},
					function(res){
						console.dir(res.data.ValidationError);
					}
				);
			}
		}
	}])
	.controller('MyCtrl2', [function() {

 	}]);