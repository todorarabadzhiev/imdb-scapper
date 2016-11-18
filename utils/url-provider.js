const constants = require("../config/constants");
const queuesFactory = require("../data-structures/queue");
const _ = require("lodash");

var compiledUrl = _.template(`http://www.imdb.com/search/title?genres=<%= genre %>&title_type=feature&0sort=moviemeter,asc&page=<%= page %>&view=simple&ref_=adv_nxt`);

let urlsQueue = queuesFactory.getQueue();
constants.genres.forEach(genre => {
    for (let i = 0; i < constants.pagesCount; i += 1) {
        let url = compiledUrl({
            'genre': genre,
            'page': i + 1
        });
        urlsQueue.push(url);
    }
});

module.exports.urlsQueue = urlsQueue;