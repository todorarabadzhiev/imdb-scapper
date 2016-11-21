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

                return resolve(imdbIds);
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
    getDetailedActor(actor) {
        return DetailedActior.getDetailedActior(actor)
    },
    insertActor(actor) {
        actor.save(function(err, act) {
            if (err) {
                console.log(err)
            };
        });
    },
    getAllActorsFromMovie(title) {
        let promise = new Promise((resolve, reject) => {
            AllMovieDetails.find({ 'title': title }, "cast", function(err, actors) {
                if (err) {
                    return reject(err);
                }

                console.log(actors[0].cast);
                return resolve(actors[0].cast);
            });
        });

        return promise;
    }
};