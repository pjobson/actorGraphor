'use strict';

/**
 * @ngdoc function
 * @name actorGraphor.controller:activeLink
 * @description
 * # activeLink
 * Directive of the actorGraphor
 */

angular.module('actorGraphor').directive('activeLink', [
	'$location',
	function($location) {
		return {
			restrict: 'A',
			link: function($scope, element, attrs) {
				var clss = attrs.activeLink;
				var href = element.children('a').attr('ng-href');
				$scope.$on('$routeChangeSuccess', function () {
					if ($location.$$path === href.replace(/(#|\?.+)/,'')) {
						element.addClass(clss);
					} else {
						element.removeClass(clss);
					}

				});
			}
		};
	}
]);
