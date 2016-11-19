const constants = require("../config/constants");
const queuesFactory = require("../data-structures/queue");

let urlsQueue = queuesFactory.getQueue();
constants.genres.forEach(genre => {
    for (let i = 0; i < constants.pagesCount; i += 1) {
        let url = constants.compiledImdbSearchUrl({
            'genre': genre,
            'page': i + 1
        });
        urlsQueue.push(url);
    }
});

module.exports.urlsQueue = urlsQueue;