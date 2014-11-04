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
		'ngTouch',
		'ngLodash',
		'highcharts-ng'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/search', {
				templateUrl: 'views/search.html',
				controller: 'SearchCtrl'
			})
			.when('/graphor', {
				templateUrl: 'views/graphor.html',
				controller: 'GraphorCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
