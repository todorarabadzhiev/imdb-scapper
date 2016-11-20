/* globals module require */

const SimpleMovie = require("./simple-movie-model");
const AllMovieDetails = require("./detailed-movie-model");
// const MovieDetails = require("./movie-detail-model");
const SimpleActior = require("./simple-actior-model");
const DetailedActior = require("./detailed-actior-model");

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
        return AllMovieDetails.getDetailedMovie(movie);
    },
    insertDetailedMovie(movie) {
        movie.save(function(err, mov) {
            if (err) {
                console.log(err)
            };
        });
    },
    // getMovieDetails(imageLink, trailerLink, title, description, genres, releaseDate, actiors) {
    //     return MovieDetails.getMovieDetails(imageLink, trailerLink, title, description, genres, releaseDate, actiors);
    // },
    // insertManyMovieDetails(movies) {
    //     MovieDetails.insertMany(movies);
    // },
    getSimpleActior(roleName, actiorName, pictureLink, imdbId) {
        return SimpleActior.getSimpleActior(roleName, actiorName, pictureLink, imdbId);
    },
    getDetailedActior(actior) {
        return DetailedActior.getDetailedActior(actior)
    }
};