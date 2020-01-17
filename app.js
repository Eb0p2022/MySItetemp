const express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose');

//  ====    DB Setup    ====
mongoose.connect('mongodb://localhost/the_den', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, "/public")));


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/multimedia', (req, res) => {
    res.render('movie-single');
})

app.listen('4000', () => {
    console.log('The Den Server has started...');
})