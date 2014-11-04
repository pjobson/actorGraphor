'use strict';

/**
 * @ngdoc function
 * @name actorGraphor.controller:focusHere
 * @description
 * # focusHere
 * Directive of the actorGraphor
 */

angular.module('actorGraphor').directive('focusHere', [
	function() {
		return {
			link: function($scope, element, attrs) {
				$scope.$watch(attrs.focusHere, function() {
					element[0].focus();
				});
			}
		};
	}
]);
