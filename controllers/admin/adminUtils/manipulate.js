const MovieAPI = require('./movie_api_queries');

class Manipulate
{
    //
    repackageMedia(results)
    {
        results.map((result) => {
            MovieAPI.getImageURL(result.poster_path, 'w500', result.id)
            .then(imageURL => {
                let newResult = {
                        title: result.name,
                        image: imageURL,
                        id: result.id,
                        description: result.overview
                    }
                    result = newResult
                    console.log(result)
            })
            .catch(err => {
                throw err
            })
        })
        return results
    }
}

module.exports = new Manipulate();