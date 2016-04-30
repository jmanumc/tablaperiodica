(function () {
	'use strict';

	angular.module('App', ['ngRoute','lumx','ngResource', 'ngSanitize'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				'templateUrl': 'templates/home.html'
			})
			.when('/about', {
				'templateUrl': 'templates/about.html'
			})
			.otherwise('/');
	}]);
})();