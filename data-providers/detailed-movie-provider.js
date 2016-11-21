const constants = require("../config/constants");
const httpRequester = require("../utils/http-requester");
const htmlParser = require("../utils/html-parser");
const modelsFactory = require("../models");
const waitTime = require("../utils/wait");
const queuesFactory = require("../data-structures/queue");

// require("../config/mongoose")(constants.connectionString);
let urlsQueue = queuesFactory.getQueue();

function getMovieDetailsFromUrl(url) {
    console.log(`Extracting details from ${url}`);
    httpRequester.get(url)
        .then((result) => {
            const html = result.body;
            return htmlParser.parseMovieDetails(html);
        })
        .then(movieDetails => {
            let dbMovie = modelsFactory.getAllMovieDetails(movieDetails);

            modelsFactory.insertDetailedMovie(dbMovie);
            console.log("inserted " + dbMovie.title);
            return waitTime.wait(constants.timeout);
        })
        .then(() => {
            if (urlsQueue.isEmpty()) {
                return;
            }

            getMovieDetailsFromUrl(urlsQueue.pop());
        })
        .catch((err) => {
            console.dir(err, { colors: true });
        });
}

function getImdbDetailedMoviesFromUrlArray(urlsArr) {
    while (urlsArr.length) {
        urlsQueue.push(urlsArr.pop());
    }

    for (i = 0; i < constants.asyncPagesCount; i += 1) {
        getMovieDetailsFromUrl(urlsQueue.pop())
    }
}

function getAllActorsFromMovie(title) {
    return modelsFactory.getAllActorsFromMovie(title);
}

module.exports.getMovieDetailsFromUrl = getMovieDetailsFromUrl;
module.exports.getImdbDetailedMoviesFromUrlArray = getImdbDetailedMoviesFromUrlArray;
module.exports.getAllActorsFromMovie = getAllActorsFromMovie;