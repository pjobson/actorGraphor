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
			actorCache: function() {
				// /api/actorCache
				return $http.get('/api/actorCache');
			},
			searchPerson: function(query) {
				// /api/searchPerson/person_name
				return $http.get('/api/searchPerson/'+ query);
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
