actorGraphor
============

actorGraphor is an angularjs experiment, finished from start to finish using about 5-days. The goal was to create individual actor pages fed
from TheMovieDB (TMDB) with a graph showing the ratings of movies the actor was cast in.

Currently the project runs using grunt for the front-end and express for the node.js service.  I use
nginx to proxy the requests to a single page.  I also cache all requests using mongodb.

To run it:

Create a mongodb laid out as such, I don't currently have a username/password on my local mongod instance, you'll have to modify themoviedb.node.js if yours does.

    moviedbcache
        movieInfo
        personCredits
        personInfo
        searchPerson

Modify your nginx.conf to proxy the front-end and back-end.  I included a sample for running on port 85. 

http://raw.githubusercontent.com/pjobson/actorGraphor/master/nginx.sample.conf

Start the front-end on port 9000 with grunt:

    actorGraphor/grunt serve

Start the node.js service on port 8080:

    actorGraphor/node_services/node themoviedb.node.js



![Alt text](https://raw.githubusercontent.com/pjobson/actorGraphor/master/app/images/actor_graphor_demo_page.jpg)

This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

https://creativecommons.org/licenses/by-nc-sa/4.0/
