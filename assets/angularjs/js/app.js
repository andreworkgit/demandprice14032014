'use strict';


// Declare app level module which depends on filters, and services
angular.module('NcBox', [
  'ngUpload',
  'ngRoute',
  'ngResource',
  'NcBox.filters',
  'NcBox.services',
  'NcBox.directives',
  'NcBox.controllers'
]).
config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$routeProvider.when('/', {templateUrl: '/angularjs/partials/home.html', controller: 'Home'});
	$routeProvider.when('/projetos', {templateUrl: '/angularjs/partials/perfil.html', controller: 'Projetos'});
  $routeProvider.when('/projeto/:index', {templateUrl: '/angularjs/partials/perfil.html', controller: 'Projeto'});
  $routeProvider.when('/notfound', {templateUrl: '/angularjs/partials/404.html', controller: 'Notfound'});
  $routeProvider.when('/:username', {templateUrl: '/angularjs/partials/parte2.html', controller: 'Projetos'});
  
  $routeProvider.otherwise({redirectTo: '/notfound'});

  $locationProvider.html5Mode(true);
}]);
