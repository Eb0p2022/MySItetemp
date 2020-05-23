const 	express = require('express'),
		bodyParser = require('body-parser'),
		flash = require('connect-flash'),
		localStrategy = require('passport-local'),
		mongoose = require('mongoose'),
		passport = require('passport'),
		path = require('path'),
		expressSession = require('express-session');

const 	adminRoutes = require('./routes/admin'),
		app = express(),
		errorController = require('./controllers/error'),
		movieRoutes = require('./routes/movie'),
		seedDB = require('./util/seed'),
		PORT = process.env.PORT||'4000',
		User = require('./models/user_model');
		flash_messages = require('./util/flash_messages');

//  ====    DB Setup    ====

//  ====	Seed Database with sample values	====
// seedDB();

console.log(__dirname);

//	====	Template Setup	====
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, "public")));

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
app.use(flash_messages);

//	====	All Routes used for Server
app.use('/admin', adminRoutes);
app.use(movieRoutes);
app.use(errorController.get404);

mongoose
	.connect('mongodb://localhost/the_den', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(PORT, () => {
			console.log(`The Den Server has started on port ${PORT}...`);
		})
	})
	.catch(err => {
		console.log(err);
	});
