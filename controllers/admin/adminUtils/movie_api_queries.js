const { image } = require('faker');

const axios = require('axios').default;
require('dotenv').config();
const redis = require('redis').createClient();
const apiKey = process.env.MOVIEDB_API_KEY
class MovieAPI
{
    constructor()
    {
        this.default_api_address = 'https://api.themoviedb.org/3'
        this.language = 'en-US'
    }

    async searchTV(query)
    {
        try {
            const searchQuery = this.default_api_address + '/search/tv' +
                `?api_key=${apiKey}&` + `language=${this.language}&` + `query=${query}&` +
                `include_adult=false`
            const response = await axios.get(searchQuery);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    getImageConfig()
    {
        return new Promise((resolve, reject) => {
            redis.get('movieDBImagesURL', async (err, data) => {
                if (err) throw err
                if (data !== null) {
                    resolve(data)
                    return
                }
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
                    const {images} = response.data;
                    redis.setex('movieDBImagesURL', 172800, images.secure_base_url)
                    resolve(images.secure_base_url)
                    return
                } catch (error) {
                    reject(error)
                }
            })
        });
    }

    getImageURL(filePath, fileSize, movieDBID)
    {
        return new Promise((resolve, reject) => {
            this.getImageConfig()
                .then(image_api_address => {
                    const searchPath = image_api_address + `${fileSize}` + `${filePath}`
                    redis.get(movieDBID, (err, imageURL) => {
                        if (err) throw err
                        if (imageURL !== null) resolve(imageURL)
                        redis.set(filePath, searchPath);
                        resolve(searchPath)
                    })
                })
                .catch(error => {
                    throw error
                })
        });
    }

    async getGenre(query)
    {
        try {
            const searchPath = this.api_address + ''
        } catch (error) {
            
        }
    }
}

module.exports = new MovieAPI();