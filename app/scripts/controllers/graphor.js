'use strict';

/**
 * @ngdoc function
 * @name actorGraphor.controller:GraphorCtrl
 * @description
 * # GraphorCtrl
 * Controller of the actorGraphor
 */
angular.module('actorGraphor').controller('GraphorCtrl', [
	'$scope',
	'$routeParams',
	'ActorResumeSrvc',
	'lodash',
	function ($scope, $routeParams, ActorResumeSrvc, lodash) {
		var movies  = [];
		var entries = [];
		var counter = 0;

		$scope.noData      = false;
		$scope.chartLoaded = false;

		$scope.personId = $routeParams.person;
		ActorResumeSrvc.personInfo($scope.personId).success(function(pIData) {
			$scope.citePattern = new RegExp('^Description above');
			$scope.profile = {
				pic:          (pIData.profile_path) ? '/img185'+pIData.profile_path : '/images/default_pic.jpg',
				biography:    pIData.biography                   || false,
				birthday:     toEpoch(pIData.birthday)           || false,
				deathday:     toEpoch(pIData.deathday)           || false,
				imdbId:       pIData.imdb_id                     || false,
				name:         pIData.name                        || false,
				placeofbirth: pIData.place_of_birth              || false,
				aka:          pIData.also_known_as               || []
			};

			if ($scope.profile.biography) {
				$scope.profile.biography = $scope.profile.biography.replace(/&amp;/g,'&').replace(/\sDescription above/,'\nDescription above').split(/\n+/);
				if ($scope.profile.biography[0] && /^From Wikipedia/.test($scope.profile.biography[0])) {
					$scope.profile.biography.shift();
				}
			}

			loadCredits();
		});
		var loadCredits = function() {
			ActorResumeSrvc.personCredits($scope.personId).success(function(pCData) {
				entries = pCData.cast;
				if (entries.length>0) {
					counter = entries.length;
					pCData.cast.forEach(function(movie) {
						ActorResumeSrvc.movieInfo(movie.id).success(function(mIData) {
							counter--;
							if (mIData.status === 'Released' && mIData.budget > 0 && mIData.vote_count > 0) {
								movie = lodash.merge(movie, {
									title:       mIData.title,
									overview:    mIData.overview,
									runtime:     mIData.runtime,
									voteAvg:     mIData.vote_average,
									voteCnt:     mIData.vote_count
								});
								movie.release_date = toEpoch(movie.release_date);
								movies.push(movie);
							}
							if (counter === 0) {
								buildChart();
							}
						});
					});
				} else {
					// No actor data found
					$scope.noData = true;
				}
			});
		};

		var buildChart = function() {
			var data = {
				cats: [],
				rats: []
			};

			movies = movies.sort(function(a,b) {
				return (a.release_date > b.release_date) ? -1 : (a.release_date < b.release_date) ? 1 : 0;
			});

			movies.forEach(function(movie) {
				data.cats.push(movie.title +'<br/>('+ (new Date(movie.release_date).getFullYear()) +')');
				data.rats.push(movie.voteAvg);
			});

			$scope.chartConfig = {
				'options': {
					'chart': {
						'type': 'bar',
						'height': (50*movies.length)+100
					},
					'title': {
						'text': $scope.profile.name +'\'s Movie Ratings'
					},
					'credits': {
						'enabled': false
					},
					'loading': false,
					'legend': {
						'enabled': false
					},
					'tooltip': {
						'valueSuffix': null
					}
				},
				'xAxis': {
					'categories': data.cats,
					'labels': {
						'style': {
							'font-size': '10px',
							'width': '125px',
							'min-width': '125px'
						},
						'useHTML': true
					}
				},
				'yAxis': {
					'min': 0,
					'max': 10,
					'title': {
						'text': 'The Movie Database (TMDb) Rating',
						'align': 'low'
					},
					'labels': {
						'overflow': 'justify'
					}
				},
				'plotOptions': {
					'bar': {
						'dataLabels': {
							'enabled': true
						}
					}
				},
				'series': [{
					'name': 'Movie Rating',
					'data': data.rats
				}]
			};

			$scope.chartLoaded = true;
		};
		var toEpoch = function(date) {
			if (date) {
				date = date.split(/-/).map(function(n,i) {
					if (i===1) {
						return parseInt(n,10)-1;
					}
					return parseInt(n,10);
				});
				date = new Date(date[0],date[1],date[2],0,0,0,0);
				return date.getTime();
			} else {
				return false;
			}
		};
	}
]);
