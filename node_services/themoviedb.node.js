/*
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
'use strict';

var apikey     = 'c3df732a39ff82b47035cda9078a7a24';
var mdb        = require('../node_modules/moviedb')(apikey);
var express    = require('../node_modules/express');
var easymongo  = require('../node_modules/easymongo');

var app    = express();
var router = express.Router();
var port   = process.env.PORT || 8080;

router.get('/', function(req, res) {
	res.json({ message: '/' });
});

// Search Person
router.route('/searchPerson').get(function(req, res) {
	res.json({ message: 'missing search parameter' });
});
router.route('/searchPerson/:actorName').get(function(req, res) {
	var actorName = escape(req.params.actorName);

	getCache({
		type:      'searchPerson',
		query:     actorName,
		res:       res,
		callback:  resultCallback
	});
});

// Person Info
router.route('/personInfo').get(function(req, res) {
	res.json({ message: 'missing person id' });
});
router.route('/personInfo/:id').get(function(req, res) {
	var personId = escape(req.params.id);

	getCache({
		type:      'personInfo',
		query:     personId,
		res:       res,
		callback:  resultCallback
	});
});

// Person Credits
router.route('/personCredits').get(function(req, res) {
	res.json({ message: 'missing person id' });
});
router.route('/personCredits/:id').get(function(req, res) {
	var personId = escape(req.params.id);

	getCache({
		type:      'personCredits',
		query:     personId,
		res:       res,
		callback:  resultCallback
	});
});

// Movie Info
router.route('/movieInfo').get(function(req, res) {
	res.json({ message: 'missing movie id' });
});
router.route('/movieInfo/:id').get(function(req, res) {
	var movieId = escape(req.params.id);

	getCache({
		type:      'movieInfo',
		query:     movieId,
		res:       res,
		callback:  resultCallback
	});
});

// Cached Actors
router.route('/actorCache').get(function(req, res) {
	var mongo      = new easymongo({dbname: 'moviedbcache'});
	var collection = mongo.collection('personInfo');

	collection.find({}, {limit: 50}, function(error, results) {
		if (error) {
			console.log('-------------------getCache error: '+ error);
		}
		var actors = [];
		results.forEach(function(actor) {
			actors.push({
				name: actor.result.name,
				id:   actor.result.id
			});
		});
		res.json(actors);
		mongo.close();
	});
});

app.use('/', router);
app.listen(port);
console.log('listening on port: '+ port);

var resultCallback = function(obj) {
	// obj.origRes
	// obj.query
	// obj.type
	// obj.results
	console.log(obj.type +' callback');
	console.log('query: '+ obj.query);
	if (obj.results.length>0) {
		// show cached result
		console.log('--displaying cached result');
		obj.origRes.json(obj.results[0].result);
		obj = null;
	} else {
		// get result and cache it
		var query = (obj.type==='searchPerson') ? { query: obj.query } : { id: obj.query };
		mdb[obj.type](query, function(err, mdbRes){
			setCache(obj.type,obj.query,mdbRes);
			obj.origRes.json(mdbRes);
			obj = null;
		});
	}
};

var getCache = function(obj) {
	var mongo      = new easymongo({dbname: 'moviedbcache'});
	var collection = mongo.collection(obj.type);

	collection.find({query: obj.query}, {limit: 1}, function(error, results) {
		if (error) {
			console.log('-------------------getCache error: '+ error);
		}
		obj.callback({
			origRes: obj.res,
			query:   obj.query,
			type:    obj.type,
			results: results
		});
		mongo.close();
	});
};

var setCache = function(type,query,res) {
	var mongo      = new easymongo({dbname: 'moviedbcache'});
	var collection = mongo.collection(type);

	var record = {
		query: query,
		result: res
	};
	collection.save(record, function(error, results) {
		if (error) {
			console.log('-------------------setCache error: '+ error);
		}
		console.log('--caching '+ type +' record');
		mongo.close();
	});
};

