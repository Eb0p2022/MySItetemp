const 	express = require('express'),
		bodyParser = require('body-parser'),
		flash = require('connect-flash'),
		mongoose = require('mongoose'),
		path = require('path'),
		expressSession = require('express-session'),
		helmet = require('helmet'),
		mongodbSessionStore = require('connect-mongodb-session')(expressSession);

const 	adminRoutes = require('./routes/admin'),
		app = express(),
		errorController = require('./controllers/error'),
		movieRoutes = require('./routes/movie'),
		seedDB = require('./util/seed'),
		PORT = process.env.PORT||'4000',
		User = require('./models/user_model'),
		dbURI = 'mongodb://localhost/the_den',
		loggedIn = require('./controllers/middlewares/loggedIn'),
		flash_messages = require('./util/flash_messages');

		
// ====	Seed Database with sample values	====
// seedDB.seedMovies();
// seedDB.seedTVShow();

//	====	Security setup... hehehe	===
app.use(helmet())

//	====	Template Setup	====
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, "public")));

//	====	Session Setup and Store
const sessionStore = new mongodbSessionStore({
	uri: dbURI,
	collection: 'sessions'
});

//  ====    AUTH Setup  ====
app.use(expressSession({
	secret: 'The Den',
	saveUninitialized: false,
	resave: false,
	store: sessionStore
}));



//	====	flash messages setup	====
app.use(flash());
app.use(flash_messages);

//	====	All Routes used for Server
app.use('/admin', adminRoutes);
app.use(movieRoutes);
app.use(errorController.get404);

//  ====    DB Setup    ====
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(PORT, () => {
			console.log(`The Den Server has started on port ${PORT}...`);
		})
	})
	.catch(err => {
		console.log(err);
	});
