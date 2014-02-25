'use strict';

/* Controllers */

angular.module('NcBox.controllers', []).
	controller('Home', function($scope){
		$scope.firstname = 'henrique';

		$scope.login = function(){
			if($scope.loginemail == 'teste@teste.com' && $scope.loginsenha == '123'){

			}else{
				$scope.errorlogin = 'Login invalido';
			}
		}
	})
	.controller('MyCtrl2', [function() {

 	}]);