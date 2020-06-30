const Movie = require('../models/movie');
const TV = require('../models/tv-show');

const movieData = [
    {
        title: 'Jumanji: The Next level',
        synopsis: 'One quiet year after unearthing the old-school video-game console in Jumanji:' +
            'Welcome to the Jungle (2017), Spencer and his friends--Martha, Fridge, and Bethany'
            + '--have all gone their separate ways. However, the power of the mysterious board'
            + 'game is unlimited, and before they know it, the quartet of reluctant players, ' +
            'along with a pair of unexpected participants, find themselves, once again, pulled '
            + 'into the dangerous mystical realm. This time, the game has evolved, and challenging' +
            'new levels await the users\' digital alter egos, as a mighty adversary bent' +
            'on destruction threatens Jumanji. Amid unforgiving deserts, treacherous jungle ' +
            'oases, and steep snow-capped mountains will Dr Smoulder Bravestone and the other characters' +
            'figure out how to cooperate, and get out of there alive ?',
        downloadLink: 'www.google.com',
        imageLink: '../public/img/blog/1.jpg',
        genres: ['Adventure', 'Action', 'Fantasy'],
        releaseYear: 2018,
        ratings: {
            IMDB: 'afaehflahelfiaekf',
            denReviews: {
                ratings: 4,
                review: 'Nulla ut maximus mauris. Sed malesuada at sapien sed euismod. \
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
        downloadLink: 'www.google.com',
        imageLink: '../public/img/blog/2.jpg',
        releaseYear: 2019,
        genres: ['Adventure', 'Drama'],
        ratings: {
            IMDB: '',
            denReviews: {
                ratings: 2,
                review: 'Nulla ut maximus mauris. Sed malesuada at sapien sed euismod. \
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
        synopsis: 'Dr. John Dolittle lives in solitude behind the high walls of his lush manor in 19th-century England. His only companionship comes from an array of exotic animals that he speaks to on a daily basis. But when young Queen Victoria becomes gravely ill, the eccentric doctor and his furry friends embark on an epic adventure to a mythical island to find the cure.',
        downloadLink: 'www.google.com',
        imageLink: '../public/img/blog/3.jpg',
        releaseYear: 2019,
        genres: ['Action', 'Adventure', 'Drama', 'Family'],
        ratings: {
            IMDB: 'aeilfailefhahf',
            denReviews: {
                ratings: 4.5,
                review: 'laliwefahlefhlkheflahrfl'
            }
        }
    }
];

const tvData = [
    {
        title: 'Lucifer',
        imageLink: 'yaeudfgafgalefakhf',
        synopsis: 'An undead dead man tries to die undyingly. Let him be approached by' +
            ' the King of the Dead.',
        genres: ['Action', 'Adventure'],
        releaseYear: 2014,
        ratings: {
            IMDB: 'aoefliha;oefj;aife',
            denReviews: {
                ratings: 2.5,
                review: 'aliefilalefalfcamfalefakwa'
            }
        },
        episodes: []
    },
    {
        title: 'The Witcher',
        imageLink: 'yaeudfgafgalefakhf',
        synopsis: 'The witcher Geralt, a mutated monster hunter, struggles to' + 
        ' find his place in a world in which people often prove more wicked than beasts.',
        genres: ['Action', 'Adventure'],
        releaseYear: 2019,
        ratings: {
            IMDB: 'aoefliha;oefj;aife',
            denReviews: {
                ratings: 4.5,
                review: 'aliefilalefalfcamfalefakwa'
            }
        },
        episodes: []
    },
    {
        title: 'Killing Eve',
        imageLink: 'aaofhalefhafhea',
        synopsis: 'The witcher Geralt, a mutated monster hunter, struggles to' +
            ' find his place in a world in which people often prove more wicked than beasts.',
        genres: ['Action', 'Adventure'],
        releaseYear: 2019,
        ratings: {
            IMDB: 'aoefliha;oefj;aife',
            denReviews: {
                ratings: 4.5,
                review: 'aliefilalefalfcamfalefakwa'
            }
        },
        episodes: []
    }
]

class SeedDB {
    seedMovies() {
        Movie.deleteMany({}, () => {
            movieData.forEach((movie) => {
                Movie.create(movie)
                    .then(() => {
                        console.log('Movie added to db: the Den!');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        });
    }

    seedTVShow() {
        tvData.forEach(tvShow => {
            TV.create(tvShow)
            .then(() => console.log('Show added to DB!'))
            .catch(err => console.log(err));
        })
    }
}

module.exports = new SeedDB();