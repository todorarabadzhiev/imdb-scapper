/* globals module require */

const SimpleMovie = require("./simple-movie-model");
const MovieDetails = require("./movie-detail-model");

module.exports = {
    getSimpleMovie(name, url) {
        return SimpleMovie.getSimpleMovieByNameAndUrl(name, url);
    },
    insertManySimpleMovies(movies) {
        SimpleMovie.insertMany(movies);
    },
    getMovieDetails() {
        return MovieDetails.getMovieDetails();
    },
    insertManyMovieDetails(movies) {
        MovieDetails.insertMany(movies);
    }
};