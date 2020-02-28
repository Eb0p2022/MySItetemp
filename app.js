const 	express = require('express'),
		adminRoutes = require('./routes/admin'),
		app = express(),
		bodyParser = require('body-parser'),
		expressSession = require('express-session');
		errorController = require('./controllers/error'),
		flash = require('connect-flash'),
		localStrategy = require('passport-local')
		methodOverride = require('method-override'),
		movieRoutes = require('./routes/movie'),
		mongoose = require('mongoose'),
		passport = require('passport'),
		path = require('path'),
		seedDB = require('./util/seed'),
		User = require('./models/user_model');

//  ====    DB Setup    ====
mongoose
	.connect('mongodb://localhost/the_den', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(() => {
		console.log('Connected to MongoDB');
	}).catch(err => {
		console.log(err);
	});

//  ====	Seed Database with sample values	====
// seedDB();

//	====	Template Setup	====
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, "/public")));

//  ====    AUTH Setup  ====
app.use(expressSession({
	secret: 'The Den',
	saveUninitialized: false,
	resave: false
}));

//  ====    Passport Setup  ====
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//	====	flash messages setup	====
app.use(flash());
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

//	====	All Routes used for Server
app.use('/admin', adminRoutes);
app.use(movieRoutes);
app.use(errorController.get404);

app.listen('4000', () => {
	console.log('The Den Server has started...');
})