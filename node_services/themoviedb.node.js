'use strict';

var apikey     = 'c3df732a39ff82b47035cda9078a7a24';
var mdb        = require('../node_modules/moviedb')(apikey);
var express    = require('../node_modules/express');
var easymongo  = require('../node_modules/easymongo');
var mongo      = new easymongo({dbname: 'moviedbcache'});

var tmdb = {
	init: function() {
		this.router    = express.Router();
		this.app       = express();
		this.port      = process.env.PORT || 8080;
		this.cachedRes = null;
		this.res       = null;

		this.setupRouter();
		this.setupRoutes();
		this.startApp();
	},
	startApp: function() {
		this.app.use('/', this.router);
		this.app.listen(this.port);
	},
	setupRouter: function() {
		this.router.get('/', function(req, res) {
			res.json({ message: '/' });
		});
	},
	setupRoutes: function() {
		var that = this;
		// Search Person
		this.router.route('/searchPerson').get(function(req, res) {
			res.json({ message: 'missing search parameter' });
		});

		this.router.route('/searchPerson/:actorName').get(function(req, res) {
			that.res = res;
			var actorName = escape(req.params.actorName);

			that.searchPersonCallback = function(results) {
				console.log('searchPersonCallback');
				if (results.length>0) {
					// show cached result
					console.log('displaying cached result');
					that.res.json(results[0].result);
				} else {
					// get result and cache it
					mdb.searchPerson({ query: actorName }, function(err, mdbRes){
						setCache('searchPerson',actorName,mdbRes);
						that.res.json(mdbRes);
					});
				}
			};

			getCache('searchPerson',actorName,that.searchPersonCallback);
		});

		// Person Info
		this.router.route('/personInfo').get(function(req, res) {
			res.json({ message: 'missing person id' });
		});

		this.router.route('/personInfo/:id').get(function(req, res) {
			that.res = res;
			var personId = escape(req.params.id);

			that.personInfoCallback = function(results) {
				console.log('personInfoCallback');
				if (results.length>0) {
					// show cached result
					console.log('displaying cached result');
					that.res.json(results[0].result);
				} else {
					// get result and cache it
					mdb.personInfo({ id: personId }, function(err, mdbRes){
						setCache('personInfo',personId,mdbRes);
						that.res.json(mdbRes);
					});
				}
			};

			getCache('personInfo',personId,that.personInfoCallback);
		});

		// Person Credits
		this.router.route('/personCredits').get(function(req, res) {
			res.json({ message: 'missing person id' });
		});

		this.router.route('/personCredits/:id').get(function(req, res) {
			that.res = res;
			var personId = escape(req.params.id);

			that.personCreditsCallback = function(results) {
				console.log('personCreditsCallback');
				if (results.length>0) {
					// show cached result
					console.log('displaying cached result');
					that.res.json(results[0].result);
				} else {
					// get result and cache it
					mdb.personCredits({ id: personId }, function(err, mdbRes){
						setCache('personCredits',personId,mdbRes);
						that.res.json(mdbRes);
					});
				}
			};

			getCache('personCredits',personId,that.personCreditsCallback);
		});

		// Movie Info
		this.router.route('/movieInfo').get(function(req, res) {
			res.json({ message: 'missing movie id' });
		});

		this.router.route('/movieInfo/:id').get(function(req, res) {
			that.res = res;
			var movieId = escape(req.params.id);

			that.movieInfoCallback = function(results) {
				console.log('movieInfoCallback');
				if (results.length>0) {
					// show cached result
					console.log('displaying cached result');
					that.res.json(results[0].result);
				} else {
					// get result and cache it
					mdb.movieInfo({ id: movieId }, function(err, mdbRes){
						setCache('movieInfo',movieId,mdbRes);
						that.res.json(mdbRes);
					});
				}
			};

			getCache('movieInfo',movieId,that.movieInfoCallback);
		});
	}

};

tmdb.init();


var getCache = function(type,query,callback) {
	var collection = mongo.collection(type);

	collection.find({query: query}, {limit: 1}, function(error, results) {
		callback(results);
	});
};

var setCache = function(type,query,res) {
	var collection = mongo.collection(type);

	var record = {
		query: query,
		result: res
	};
	collection.save(record, function(error, results) {
		// Returns a new document (array).
		console.log(results);
	});
};


/*
	moviedbcache
		searches   // cache of searches
		actor      // cache of actor queries


	Image Path
	http://image.tmdb.org/t/p/original/x5bWINuTZxSCAYM5AechsLSlI3e.jpg
	                          original
	                          w1280
	                          w780
	                          w632
	                          w500
	                          w300
	                          w185
	                          w92
	                          w45
*/



// mdb.movieInfo({id: 100}, function(err, res){
//   console.log(res);
// });

// mdb.searchPerson({query: 'Pit' }, function(err, res){
//   console.log(res);
// });

// mdb.personImages({id:287}, function(err, res) {
// 	console.log(res);
// });
