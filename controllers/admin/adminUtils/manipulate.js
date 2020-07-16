const MovieAPI = require('./movie_api_queries');

class Manipulate
{
    //
    async repackageMedia(results)
    {
        let newResults = []
        for (let index = 0; index < results.length; index++) {
            let result = results[index];
            try {
                let imageURL = ""
                if(result.poster_path)
                {
                    imageURL = await MovieAPI.getImageURL(result.poster_path, 'w92')
                }
                const newResult = {
                    title: result.name,
                    image: imageURL,
                    id: result.id,
                    description: result.overview
                }
                newResults.push(newResult)
            } catch (error) {
                throw error
            }
        }
        return newResults
    }
}

module.exports = new Manipulate();