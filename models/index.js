/* globals module require */

const SimpleMovie = require("./simple-movie-model");
const MovieDetails = require("./detailed-movie-model");

module.exports = {
    getSimpleMovie(name, url) {
        return SimpleMovie.getSimpleMovieByNameAndUrl(name, url);
    },
    insertManySimpleMovies(movies) {
        SimpleMovie.insertMany(movies);
    },
    getAllMoviesImdbIds() {
        let promise = new Promise((resolve, reject) => {
            SimpleMovie.find({}, "imdbId", function(err, imdbIds) {
                if (err) {
                    return reject(err);
                }

                resolve(imdbIds);
            });
        });

        return promise;
    },
    getAllMovieDetails(movie) {
        return MovieDetails.getDetailedMovie(movie);
    },
    insertDetailedMovie(movie) {
        movie.save(function(err, mov) {
            if (err) {
                console.log(err)
            };
        });
    }
};