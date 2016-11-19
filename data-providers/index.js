const simpleMoviesProvider = require("./simple-movie-provider");
const detailedMovieProvider = require("./detailed-movie-provider");
const constants = require("../config/constants");

module.exports = {
    getImdbSimpleMovies() {
        return simpleMoviesProvider.getImdbSimpleMovies();
    },
    getMoviesImdbIdsFromSimpleMovies() {
        return simpleMoviesProvider.getMoviesImdbIdsFromSimpleMovies();
    },
    getMoviesDetailedData() {
        simpleMoviesProvider.getMoviesImdbIdsFromSimpleMovies()
            .then(imdbIds => {
                let moviesUrls = imdbIds.map(id => {
                    let url = constants.compiledImdbTitleUrl({
                        'imdbId': id.imdbId
                    });

                    return url;
                });

                return Promise.resolve(moviesUrls);
            })
            .then(urls => {
                detailedMovieProvider.getImdbDetailedMoviesFromUrlArray(urls);
            });
    }
};