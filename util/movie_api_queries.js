const axios = require('axios').default;
class MovieAPI
{
    constructor()
    {
        this.api_address = 'https://api.themoviedb.org/3'
        this.apiKey = process.env.MOVIEDB_API_KEY || 'c777c3d9c7b6ffbeb5618ac76a9eac56'
        this.language = 'en-US'
    }

    async searchTV(query)
    {
        try {
            const searchPath =  this.api_address + '/search/tv' +
                `?api_key=${this.apiKey}&` + `language=${this.language}&` + `query=${query}&` +
                `include_adult=false`
            const response = await axios.get(searchPath);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

let testAPI = new MovieAPI();
testAPI.searchTV('Lucifer');