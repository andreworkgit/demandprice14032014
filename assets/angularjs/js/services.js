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
      listar: {
        method: 'POST',
        url: '/produtos/listar'
        //,isArray: true
      },
      liststore: {
        method: 'POST',
        url: '/produtos/listsubstores'
        //,isArray: true
      },
      sendEmail: {
        method: 'POST',
        url: '/produtos/sendemail'
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

