const express = require('express'),
	adminRoutes = require('./routes/admin'),
	app = express(),
	bodyParser = require('body-parser'),
	expressSession = require('express-session');
	errorController = require('./controllers/error'),
	localStrategy = require('passport-local')
	methodOverride = require('method-override'),
	movieRoutes = require('./routes/movie'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	path = require('path'),
	User = require('./models/user');

//  ====    DB Setup    ====
mongoose
	.connect('mongodb://localhost/the_den', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(() => {
		console.log('Connected to MongoDB');
	}).catch(err => {
		console.log(err);
	});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, "/public")));

//  ====    AUTH Setup  ====
app.use(expressSession({
	secret: 'David is a giant at killing giants',
	saveUninitialized: false,
	resave: false
}));

//  ====    Passport Setup  ====
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(adminRoutes);
app.use(movieRoutes);
app.use(errorController.get404);

app.listen('4000', () => {
	console.log('The Den Server has started...');
})