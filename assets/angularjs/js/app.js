'use strict';


// Declare app level module which depends on filters, and services
angular.module('NcBox', [
  'ngRoute',
  'NcBox.filters',
  'NcBox.services',
  'NcBox.directives',
  'NcBox.controllers'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'angularjs/partials/home.html', controller: 'Home'});
	$routeProvider.when('/view1', {templateUrl: 'angularjs/partials/partial1.html', controller: 'MyCtrl1'});
	$routeProvider.when('/view2', {templateUrl: 'angularjs/partials/partial2.html', controller: 'MyCtrl2'});
	$routeProvider.otherwise({redirectTo: '/'});
}]);
