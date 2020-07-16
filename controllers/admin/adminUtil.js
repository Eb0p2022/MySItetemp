const   MovieDB = require('./adminUtils/movie_api_queries'),
        Manipulate = require('./adminUtils/manipulate');
        
exports.postTVSearch = async (req, res, next) => {
    res.status(200);
    let payload = {
        error: ''
    }
    try
    { 
        let response = await MovieDB.searchTV(req.params.searchParam);
        if(response.status == 200 && response.data.results.length != 0){
            // console.log(response.data.results)
           payload.results = await Manipulate.repackageMedia(response.data.results)
        } else {
            payload.error = 'The resource you requested could not be found.'
        }
        res.json(payload);
    }
    catch(error)
    {
        payload.error = error;
        res.json(payload);
        throw(error);
    }
}