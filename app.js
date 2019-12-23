const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://shaz:shaz@cluster0-spesv.mongodb.net/yelp_camp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

// Schema Setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// GET
app.get('/', (req, res) => {
    res.render('landing');
})

app.get('/campgrounds', (req, res) => {
    // get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds', {campgrounds: allCampgrounds});
        }
    })
    // res.render('campgrounds', {campgrounds: campgrounds}); // {name: data}
})

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
})

// POST
app.post('/campgrounds', (req, res) => {
    console.log('req: ', req.body);
    // get data from form and add to cg array
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name: name, image: image};
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

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})