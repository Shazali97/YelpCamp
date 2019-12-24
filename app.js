const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const seedDB = require('./seed');

mongoose.connect('mongodb+srv://shaz:shaz@cluster0-spesv.mongodb.net/yelp_camp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

// Campground.create(
//     {
//         name: "Shaz Creek",
//         image: "https://images.unsplash.com/photo-1507720708252-1ddeb1dbff34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
//         description: "Huge hill"
//     },
//     (err, campground) => {
//         if(err){
//             console.log(err);
//         } else {
//             console.log('created!: ' + campground);
//         }
//     }
// )

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

seedDB();

// INDEX - show all campgrounds
app.get('/', (req, res) => {
    res.render('landing');
})

app.get('/campgrounds', (req, res) => {
    // get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: allCampgrounds});
        }
    })
    // res.render('campgrounds', {campgrounds: campgrounds}); // {name: data}
})

// NEW - show form to create campground
app.get('/campgrounds/new', (req, res) => {
    res.render('new');
})

// CREATE - add new campgrounds to DB
app.post('/campgrounds', (req, res) => {
    // get data from form and add to cg array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = {name: name, image: image, description: desc}; // {name: data}
    // create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    })
    // redirect back to cg page
})

// SHOW
app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            // render show template with campground
            res.render('show', {campground: foundCampground});
        }
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})