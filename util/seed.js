const Movie = require('../models/movie');

const data = [
    {
        title: 'Jumanji: The Next level',
        synopsis: 'One quiet year after unearthing the old-school video-game console in Jumanji: Welcome to the Jungle (2017), Spencer and his friends--Martha, Fridge, and Bethany--have all gone their separate ways. However, the power of the mysterious board game is unlimited, and before they know it, the quartet of reluctant players, along with a pair of unexpected participants, find themselves, once again, pulled into the dangerous mystical realm. This time, the game has evolved, and challenging new levels await the users\' digital alter egos, as a mighty adversary bent on destruction threatens Jumanji. Amid unforgiving deserts, treacherous jungle oases, and steep snow-capped mountains will Dr Smoulder Bravestone and the other characters figure out how to cooperate, and get out of there alive ?',
        review: 'Quite a banger. The big comedic genius, \'The Rock\', outdoes himself. So do Kevin Hart and Jack Black.',
        fileLink: 'www.google.com',
        image: '../public/img/blog/1.jpg',
        ratings: {
            IMDB: '',
            rottenTomatoes: '',
            googleReviews: '',
            denReviews: {
                ratings: '4/5',
                text: 'Nulla ut maximus mauris. Sed malesuada at sapien sed euismod. \
                Vestibulum pharetra in sem id laoreet. \
                Cras metus ex, placerat nec justo quis, luctus posuere ex. \
                Vivamus volutpat nibh ac sollicitudin imperdiet. \
                Donec scelerisque lorem sodales odio ultricies, nec rhoncus ex lobortis.\
                Vivamus tincidunt sit amet sem id varius.\
                Donec ele- mentum aliquet tortor.Curabitur justo mi, efficitur sed eros aliquet, dictum molestie eros.\
                Nullam scelerisque convallis gravida.\
                Morbi id lorem accumsan, scelerisque enim laoreet, sollicitudin neque.\
                Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque'
            }
        }
    },
    {
        title: 'Charlie\'s Angels',
        synopsis: 'One quiet year after unearthing the old-school video-game console in Jumanji: Welcome to the Jungle (2017), Spencer and his friends--Martha, Fridge, and Bethany--have all gone their separate ways. However, the power of the mysterious board game is unlimited, and before they know it, the quartet of reluctant players, along with a pair of unexpected participants, find themselves, once again, pulled into the dangerous mystical realm. This time, the game has evolved, and challenging new levels await the users\' digital alter egos, as a mighty adversary bent on destruction threatens Jumanji. Amid unforgiving deserts, treacherous jungle oases, and steep snow-capped mountains will Dr Smoulder Bravestone and the other characters figure out how to cooperate, and get out of there alive ?',
        review: 'Quite a banger. The big comedic genius, \'The Rock\', outdoes himself. So do Kevin Hart and Jack Black.',
        fileLink: 'www.google.com',
        image: '../public/img/blog/2.jpg',
        ratings: {
            IMDB: '',
            rottenTomatoes: '',
            googleReviews: '',
            denReviews: {
                ratings: '2/5',
                text: 'Nulla ut maximus mauris. Sed malesuada at sapien sed euismod. \
                Vestibulum pharetra in sem id laoreet. \
                Cras metus ex, placerat nec justo quis, luctus posuere ex. \
                Vivamus volutpat nibh ac sollicitudin imperdiet. \
                Donec scelerisque lorem sodales odio ultricies, nec rhoncus ex lobortis.\
                Vivamus tincidunt sit amet sem id varius.\
                Donec ele- mentum aliquet tortor.Curabitur justo mi, efficitur sed eros aliquet, dictum molestie eros.\
                Nullam scelerisque convallis gravida.\
                Morbi id lorem accumsan, scelerisque enim laoreet, sollicitudin neque.\
                Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque'
            }
        }
    },
    {
        title: 'Dolittle',
        synopsis: 'One quiet year after unearthing the old-school video-game console in Jumanji: Welcome to the Jungle (2017), Spencer and his friends--Martha, Fridge, and Bethany--have all gone their separate ways. However, the power of the mysterious board game is unlimited, and before they know it, the quartet of reluctant players, along with a pair of unexpected participants, find themselves, once again, pulled into the dangerous mystical realm. This time, the game has evolved, and challenging new levels await the users\' digital alter egos, as a mighty adversary bent on destruction threatens Jumanji. Amid unforgiving deserts, treacherous jungle oases, and steep snow-capped mountains will Dr Smoulder Bravestone and the other characters figure out how to cooperate, and get out of there alive ?',
        review: 'Quite a banger. The big comedic genius, \'The Rock\', outdoes himself. So do Kevin Hart and Jack Black.',
        fileLink: 'www.google.com',
        image: '../public/img/blog/3.jpg',
        ratings: {
            IMDB: '',
            rottenTomatoes: '',
            googleReviews: '',
            denReviews: {
                ratings: '4.5/5',
                text: 'Nulla ut maximus mauris. Sed malesuada at sapien sed euismod. \
                Vestibulum pharetra in sem id laoreet. \
                Cras metus ex, placerat nec justo quis, luctus posuere ex. \
                Vivamus volutpat nibh ac sollicitudin imperdiet. \
                Donec scelerisque lorem sodales odio ultricies, nec rhoncus ex lobortis.\
                Vivamus tincidunt sit amet sem id varius.\
                Donec ele- mentum aliquet tortor.Curabitur justo mi, efficitur sed eros aliquet, dictum molestie eros.\
                Nullam scelerisque convallis gravida.\
                Morbi id lorem accumsan, scelerisque enim laoreet, sollicitudin neque.\
                Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque'
            }
        }
    }
];

const seedDB = () => {
    Movie.deleteMany({}, () => {
        data.forEach((movie) => {
            Movie.create(movie)
                .then(() => {
                    console.log('Movie added to db: the Den!');
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
};

module.exports = seedDB;