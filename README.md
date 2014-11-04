actorGraphor
============

actorGraphor is a angularjs learning experiment. The goal was to create individual actor pages fed
from TheMovieDB (TMDB) with a graph showing the ratings of movies the actor was cast in.

Currently the project runs using grunt for the front-end and express for the node.js service.  I use
nginx to proxy the requests to a single page.  I also cache all requests using mongodb.

