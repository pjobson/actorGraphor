'use strict';

/**
 * @ngdoc function
 * @name actorGraphor.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the actorGraphor
 */
angular.module('actorGraphor').controller('SearchCtrl', [
	'$scope',
	'$routeParams',
	'ActorResumeSrvc',
	function ($scope, $routeParams, ActorResumeSrvc) {
		var actorSearch = function(nameValue) {
			ActorResumeSrvc.searchPerson(nameValue).success(function(sPData) {
				$scope.actorList = sPData.results;
			});
		};

		$scope.keyup = function(ev,nameValue) {
			if ((nameValue && nameValue.length>3) || ev.keyCode === 13) {
				actorSearch(nameValue);
			}
		};
	}
]);
