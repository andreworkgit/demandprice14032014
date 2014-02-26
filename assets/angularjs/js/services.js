'use strict';

/* Services */

angular.module('NcBox.services', []).
  value('version', '0.1')
  .factory('usersService', ['$resource', function($resource){
  	return $resource('/users/:id',{id: '@id'}, {
  		create: {
  			method: 'POST',
  			utl: '/users/create'
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

