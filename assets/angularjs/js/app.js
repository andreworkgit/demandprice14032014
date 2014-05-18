'use strict';


// Declare app level module which depends on filters, and services
angular.module('App', [
  'ngUpload',
  'ngRoute',
  'ngResource',
  'NcBox.filters',
  'NcBox.services',
  'NcBox.directives',
  'NcBox.controllers',
  'ui.bootstrap'
]).
config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$routeProvider.when('/', {templateUrl: '/angularjs/partials/home.html', controller: 'Home'});
  $routeProvider.when('/dashboard', {templateUrl: '/angularjs/partials/dashboard/index.html', controller: 'DashBoard'});
	$routeProvider.when('/assinantes', {templateUrl: '/angularjs/partials/dashboard/assinantes.html', controller: 'Assinantes'});
  $routeProvider.when('/obrigado', {templateUrl: '/angularjs/partials/obrigado.html', controller: 'Assinantes'});
  $routeProvider.when('/login', {templateUrl: '/angularjs/partials/login.html', controller: 'Login'});


  $routeProvider.when('/projetos', {templateUrl: '/angularjs/partials/perfil.html', controller: 'Projetos'});
  $routeProvider.when('/projeto/:index', {templateUrl: '/angularjs/partials/perfil.html', controller: 'Projeto'});
  $routeProvider.when('/notfound', {templateUrl: '/angularjs/partials/404.html', controller: 'Notfound'});
  $routeProvider.when('/:username', {templateUrl: '/angularjs/partials/parte2.html', controller: 'Projetos'});
  $routeProvider.when('/auth/front', {templateUrl: '/angularjs/partials/auth/front.html', controller: 'FrontAuth'});
  
  $routeProvider.otherwise({redirectTo: '/login'});

  $locationProvider.html5Mode(true);
}]);
