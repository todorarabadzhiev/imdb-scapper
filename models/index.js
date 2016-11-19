/* globals module require */

const SimpleMovie = require("./simple-movie-model");
const MovieDetails = require("./movie-detail-model");
const SimpleActior = require("./simple-actior-model");

module.exports = {
    getSimpleMovie(name, url) {
        return SimpleMovie.getSimpleMovieByNameAndUrl(name, url);
    },
    insertManySimpleMovies(movies) {
        SimpleMovie.insertMany(movies);
    },
    getMovieDetails(imageLink, trailerLink, title, description, genres, releaseDate, actiors) {
        return MovieDetails.getMovieDetails(imageLink, trailerLink, title, description, genres, releaseDate, actiors);
    },
    insertManyMovieDetails(movies) {
        MovieDetails.insertMany(movies);
    },
    getSimpleActior(roleName, actiorName, pictureLink, imdbId) {
        return SimpleActior.getSimpleActior(roleName, actiorName, pictureLink, imdbId);
    }
};