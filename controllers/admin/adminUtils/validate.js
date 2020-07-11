class Validations{
    async validateMovie(movieObj){
        return new Promise((resolve, reject) => {
            let errors = []

            if (!movieObj.title) {
                errors.push('Empty movie title.');
            }

            if (!movieObj.synopsis) {
                errors.push('Empty movie synopsis.');
            }

            if (!movieObj.downloadLink) {
                errors.push('Download link not provided.');
            }

            if (!movieObj.releaseYear) {
                errors.push('Release year not provided.');
            } else {
                let today = new Date();
                let currentYear = today.getFullYear();
                if (Number(movieObj.releaseYear) > currentYear) {
                    errors.push(`Supplied release date: "${movieObj.releaseYear}" is set in future.`);
                };

                if (Number(movieObj.releaseYear) < 1888) {
                    errors.push(`Supplied year: ${movieObj.releaseYear} is an invalid year for tv shows.`)
                }
            }
            resolve(errors);
        });
    }

    async validateTVShow(tvObj){
        return new Promise((resolve, reject) => {
            let errors = []

            if (!tvObj.title) {
                errors.push('Empty tv show title.');
            }

            if (tvObj.releaseYear) {
                let today = new Date();
                let currentYear = today.getFullYear();
                if (Number(tvObj.releaseYear) > currentYear) {
                    errors.push(`Supplied release date: "${tvObj.releaseYear}" is set in future.`);
                };

                if (Number(tvObj.releaseYear) < 1888) {
                    errors.push(`Please supply a release year greater than 1888.`);
                }
            }
            resolve(errors);
        });
    }
}

module.exports = new Validations();