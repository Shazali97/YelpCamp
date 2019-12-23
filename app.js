const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const campgrounds = [
    { name: 'Salmon Creek', image: 'https://live.staticflickr.com/5489/10633082724_0131de79b4_m.jpg'},
    { name: 'Ahad Creek', image: 'https://live.staticflickr.com/3698/10633084834_a625340ccc_m.jpg'},
    { name: 'Shaz Creek', image: 'https://farm1.staticflickr.com/121/290597016_bbb430eb1a_m.jpg'},
    { name: 'Baltimore Creek', image: 'https://live.staticflickr.com/3795/10633096196_bd02cceef9_m.jpg'},
]
// GET
app.get('/', (req, res) => {
    res.render('landing');
})

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {campgrounds: campgrounds}); // {name: data}
})

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
})

// POST
app.post('/campgrounds', (req, res) => {
    // get data from form and add to cg array
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to cg page
    res.redirect('/campgrounds');
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})