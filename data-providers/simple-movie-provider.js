const constants = require("../config/constants");
const httpRequester = require("../utils/http-requester");
const htmlParser = require("../utils/html-parser");
const queuesFactory = require("../data-structures/queue");
const modelsFactory = require("../models");
const waitTime = require("../utils/wait");
const urlProvider = require("../utils/url-provider");

let urlsQueue = urlProvider.urlsQueue;

require("../config/mongoose")(constants.connectionString);

function getMoviesFromUrl(url) {
    console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then((result) => {
            const selector = constants.movieSelctor;
            const html = result.body;
            return htmlParser.parseSimpleMovie(selector, html);
        })
        .then(movies => {
            let dbMovies = movies.map(movie => {
                return modelsFactory.getSimpleMovie(movie.title, movie.url);
            });

            modelsFactory.insertManySimpleMovies(dbMovies);
            console.log(dbMovies.length);
            return waitTime.wait(constants.timeout);
        })
        .then(() => {
            if (urlsQueue.isEmpty()) {
                return;
            }

            getMoviesFromUrl(urlsQueue.pop());
        })
        .catch((err) => {
            console.dir(err, { colors: true });
        });
}

function getImdbSimpleMovies() {
    for (i = 0; i < constants.asyncPagesCount; i += 1) {
        getMoviesFromUrl(urlsQueue.pop())
    }
}

function getMoviesImdbIdsFromSimpleMovies() {
    return modelsFactory.getAllMoviesImdbIds();
}

module.exports.getImdbSimpleMovies = getImdbSimpleMovies;
module.exports.getMoviesImdbIdsFromSimpleMovies = getMoviesImdbIdsFromSimpleMovies;