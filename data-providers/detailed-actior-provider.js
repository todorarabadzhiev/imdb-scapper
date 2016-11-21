const constants = require("../config/constants");
const httpRequester = require("../utils/http-requester");
const htmlParser = require("../utils/html-parser");
const modelsFactory = require("../models");
const waitTime = require("../utils/wait");
const queuesFactory = require("../data-structures/queue");

var urlsQueue = queuesFactory.getQueue();

function getDetailedActorFromUrl(url) {
    console.log(`Extracting details from ${url}`);

    httpRequester.get(url)
        .then((result) => {
            const html = result.body;

            return htmlParser.parseDetailActor(html);
        })
        .then(detailedActor => {
            let dActor = modelsFactory.getDetailedActor(detailedActor);

            modelsFactory.insertActor(dActor);
            console.log("inserting " + dActor.name);
            return waitTime.wait(constants)
        })
        .then(() => {
            if (urlsQueue.isEmpty()) {
                return;
            }

            getDetailedActorFromUrl(urlsQueue.pop())
        })
        .catch((err) => {
            console.dir(err, { colors: true });
        });
}

function getImdbDetailedActiorFromUrlsArray(urlsArr) {
    while (urlsArr.length) {
        urlsQueue.push(urlsArr.pop());
    }

    for (i = 0; i < constants.asyncPagesCount; i += 1) {
        let url = urlsQueue.pop();
        if (url) {
            getDetailedActorFromUrl(url);
        }
    }
}

module.exports.getDetailedActorFromUrl = getDetailedActorFromUrl;
module.exports.getImdbDetailedActiorFromUrlsArray = getImdbDetailedActiorFromUrlsArray;