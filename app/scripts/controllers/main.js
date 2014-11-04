'use strict';

/**
 * @ngdoc function
 * @name actorGraphor.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the actorGraphor
 */
angular.module('actorGraphor').controller('MainCtrl', [
	'$scope',
	'$location',
	'ActorResumeSrvc',
	function ($scope, $location, ActorResumeSrvc) {
		ActorResumeSrvc.actorCache().success(function(aCData) {
			$scope.cachedActors = aCData.reverse();
		});
	}
]);
