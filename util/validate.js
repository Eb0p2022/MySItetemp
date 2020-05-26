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
                    errors.push(`Supplied year: ${movieObj.releaseYear} is invalid.`)
                }
            }
            resolve(errors);
        });
    }
}

module.exports = new Validations();