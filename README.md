This is a README for Yelp Camp!

RESTful ROUTES:
name         url               verb      desc
====================================================================
INDEX    /campgrounds          GET       Show all Campgrounds from DB
NEW      /campgrounds/new      GET       Show form to create new Campground
CREATE   /campgrounds          POST      Add new campground to the DB
SHOW     /campgrounds/:id      GET       Shows one specific campground

Mongo:
.find({}, (err, allFound) => {}) -- find all from DB
.create(objType, (err, cb) => {}) -- create one to DB
.findById(req.params.x, (err, cb) => {}) -- find one from DB
