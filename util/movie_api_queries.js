const axios = require('axios').default;
require('dotenv').config();
const apiKey = process.env.MOVIEDB_API_KEY
class MovieAPI
{
    constructor()
    {
        this.api_address = 'https://api.themoviedb.org/3'
        this.language = 'en-US'
    }

    async searchTV(query)
    {
        try {
            const searchPath =  this.api_address + '/search/tv' +
                `?api_key=${apiKey}&` + `language=${this.language}&` + `query=${query}&` +
                `include_adult=false`
            const response = await axios.get(searchPath);
            console.log(response.data.results);
        } catch (error) {
            console.log(error);
        }
    }
}

let testAPI = new MovieAPI()
testAPI.searchTV('Lucifer')

// module.exports = new MovieAPI();