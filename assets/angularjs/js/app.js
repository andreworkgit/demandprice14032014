'use strict';


// Declare app level module which depends on filters, and services
angular.module('NcBox', [
  'ngRoute',
  'ngResource',
  'NcBox.filters',
  'NcBox.services',
  'NcBox.directives',
  'NcBox.controllers'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'angularjs/partials/home.html', controller: 'Home'});
	$routeProvider.when('/projetos', {templateUrl: 'angularjs/partials/perfil.html', controller: 'Projetos'});
  $routeProvider.when('/projetos/projeto', {templateUrl: 'angularjs/partials/partial1.html', controller: 'Projetos'});
	$routeProvider.otherwise({redirectTo: '/'});
}]);
