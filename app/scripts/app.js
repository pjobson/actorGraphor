'use strict';

/**
 * @ngdoc overview
 * @name actorGraphor
 * @description
 * # actorGraphor
 *
 * Main module of the application.
 */
angular
	.module('actorGraphor', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl'
			})
			.when('/graphor', {
				templateUrl: 'views/graphor.html',
				controller: 'GraphorCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
