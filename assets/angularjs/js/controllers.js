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

	$scope.logado = function(){
		usersService.logado(
			function(res){
				if(!res.result){
					$location.url('/');
				}else{
					$location.url('/projetos');
				}
			}
		);
	}
}]).
controller('Projetos', ['$scope','$location', 'usersService','projetosService', function($scope, $location, usersService,projetosService){
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

	$scope.logado();

	$scope.logoff = function(){usersService.logoff(function(res){$location.url('/');});}

	$scope.parte = 'angularjs/partials/listaProjetos.html';
	/*$scope.projetos = [
		{nome: 'projeto1', descricao: 'descricao1'},
		{nome: 'projeto2', descricao: 'descricao2'},
		{nome: 'projeto3', descricao: 'descricao3'},
		{nome: 'projeto4', descricao: 'descricao4'},
		{nome: 'projeto5', descricao: 'descricao5'},
	];*/
	
	$scope.includeNewProjeto = function(){
		$scope.item = '';
		$scope.ngNewProjeto = 'angularjs/partials/newProjeto.html';
	}

	$scope.includeEditProjeto = function(index){
		$scope.ngNewProjeto = 'angularjs/partials/editProjeto.html';
		$scope.item = {
			id: $scope.projetos[index].id,
			nome: $scope.projetos[index].nome,
			descricao: $scope.projetos[index].descricao
		};;
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

	//$scope.lista();

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
					//console.log(res.projeto);
					$scope.lista();
					//$location.url('/projetos');
					$scope.ngNewProjeto = '';
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
				$scope.lista();
			}
		);
	}

	$scope.editar = function(item){
		var result = projetosService.edit(
			{},
			item,
			function(res){
				$scope.lista();
				$scope.ngNewProjeto = '';
			}
		);
	}


	$scope.upload = function(item){
		console.dir(item);

	}




	$scope.foo = "Hello World";
    $scope.disabled = false;
    $scope.bar = function(content) {
      if (console) console.log(content);
      $scope.uploadResponse = content.msg;
    }

}]);