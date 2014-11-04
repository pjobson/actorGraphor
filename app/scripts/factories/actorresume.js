'use strict';

/**
 * @ngdoc function
 * @name actorGraphor.factor:ActorResumeSrvc
 * @description
 * # ActorResumeSrvc
 * Factory of the actorGraphor
 */
angular.module('actorGraphor').factory('ActorResumeSrvc', function ($http) {
		var factory = {
			searchPerson: function() {
				// /api/searchPerson/person_name
				// $http.get('//api/searchPerson/person_name/').success(function() {
				// 	// stuff
				// });
			},
			personInfo: function(personId) {
				// /api/personInfo/##
				return $http.get('/api/personInfo/'+ personId);
			},
			personCredits: function(personId) {
				// /api/personCredits/##
				return $http.get('/api/personCredits/'+ personId);
			},
			movieInfo: function(movieId) {
				// /api/movieInfo/##
				return $http.get('/api/movieInfo/'+ movieId);
			}
		};
		return factory;
	}
);
