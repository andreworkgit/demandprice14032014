'use strict';

/* Services */

angular.module('NcBox.services', []).
  value('version', '0.1')
  .factory('usersService', ['$resource', function($resource){
  	return $resource('/users/:id',{id: '@id'}, {
  		create: {
  			method: 'POST',
  			url: '/users/create'
  		},
  		login: {
  			method: 'POST',
  			url: '/users/login'
  		},
  		logado: {
  			method: 'GET',
  			url: '/users/logado'
  		},
      listarall: {
        method: 'POST',
        url: '/users/listarall'
        //,isArray: true
      },
  		logoff: {
  			method: 'GET',
  			url: '/users/logoff'
  		}  	
  	});
  }])
  .factory('projetosService', ['$resource', function($resource){
    return $resource('/projetos/:id',{id: '@id'}, {
      create: {
        method: 'POST',
        url: '/projetos/create'
      },
      lista: {
        method: 'GET',
        url: '/projetos/lista'
      },
      del: {
        method: 'POST',
        url: '/projetos/delete'
      },
      edit: {
        method: 'POST',
        url: '/projetos/edit'
      }
    });
  }])
  .factory('produtosService', ['$resource', function($resource){
    return $resource('/users/:id',{id: '@id'}, {
      create: {
        method: 'POST',
        url: '/users/create'
      },
      login: {
        method: 'POST',
        url: '/users/login'
      },
      logado: {
        method: 'GET',
        url: '/users/logado'
      },
      listar: {
        method: 'POST',
        url: '/auth/teste5'
        //,isArray: true
      },
      logoff: {
        method: 'GET',
        url: '/users/logoff'
      }   
    });
  }]);




  /*


  .factory('usersService', ['$resource', function($resource){
  	return $resource('/users/:id',{id: '@id'}, {
  		create: {
  			method: 'POST',
  			utl: '/users/create'
  		}
  	});
  }]);*/

