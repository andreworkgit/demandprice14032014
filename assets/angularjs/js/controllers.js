'use strict';

/* Controllers */

angular.module('NcBox.controllers', []).
run(['$rootScope','usersService','$location',function($rootScope, usersService, $location) {

	$rootScope.$on('handleEmit', function(event, args) {
        $rootScope.$broadcast('handleBroadcast', args);
    });

	$rootScope.logado = function(pag){
		usersService.logado(
			function(res){
				if(!res.result){
					console.log(pag);
					if(pag == 'DashBoard'){
						$location.url('/login');
					}
				}else{
					//if(pag == 'Home'){
						//Se for para home volta para dashboard se estiver logado
					//	$location.url('/dashboard');
					//}else{
						//Se estiver em dashborad ou em outro carregar dados do user
						//$rootScope.user = res.data;
						$rootScope.$emit('handleEmit', {user: res.data});
					//}
				}
			}
		);
	}

	$rootScope.logoff = function(){
		usersService.logoff(function(res){
			if(res.result){
				$rootScope.$emit('handleEmit', {user: ""});
				$location.url('/');
				//return true;
			}else{
				//return false;
			}
		});
	}

	$rootScope.popup = function(link, titulo){
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

	$rootScope.mainnav = "/angularjs/partials/main-nav.html";
	$rootScope.urlfooter = "/angularjs/partials/footer.html";
	$rootScope.isCollapsed = [];
}]).
controller('Home', ['$scope','$location', '$rootScope', 'usersService', function($scope, $location, $rootScope, usersService){

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
controller('FrontAuth', ['$scope',function($scope){

	$scope.alerta = function (){
		window.opener.location ="/dashboard";
		window.close();
	}
	
}]).
controller('Nav', ['$scope','$rootScope','produtosService',function($scope,$rootScope,produtosService){

	$scope.teste = function (){
		console.log("teste");
	}

	$rootScope.$on('handleBroadcast', function(event, args) {
        $scope.user = args.user;
    });

    $scope.logoff = function(){
    	$rootScope.logoff();
    }

}]).
controller('Assinantes', ['$scope','$rootScope','produtosService',function($scope,$rootScope,produtosService){
	$rootScope.$on('handleBroadcast', function(event, args) {
        $scope.user = args.user;
    });
    $rootScope.logado();
}]).
controller('Login', ['$scope','$rootScope','produtosService',function($scope,$rootScope,produtosService){
	$rootScope.$on('handleBroadcast', function(event, args) {
        $scope.user = args.user;
    });
    $rootScope.logado('Login');
}]).
controller('DashBoard', ['$scope','$rootScope','produtosService',function($scope,$rootScope,produtosService){
	$rootScope.logado('DashBoard');
	$scope.solicitado = [];
	$rootScope.$on('handleBroadcast', function(event, args) {
        $scope.user = args.user;
        if($scope.user && $scope.user.videos.length>0){
        	_.each($scope.user.videos,function(v,k){
        		$scope.solicitado[v.ref] = true;
        	});
        	//console.log($scope.solicitado);
        }
    });

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
				          message: "Obrigado <br> Logo entraremos em contato para apresentar os melhores imóveis para você",
				        });
				        $scope.user = {};
					}else{
						bootbox.alert({
				          message: "Ocorreu um erro ao enviar os dados, por favor envie novamente",
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
	}

	
	
}]).
controller('Notfound', [function(){
	
}]);
