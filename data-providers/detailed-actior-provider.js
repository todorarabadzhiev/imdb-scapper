const constants = require("../config/constants");
const httpRequester = require("../utils/http-requester");
const htmlParser = require("../utils/html-parser");
const modelsFactory = require("../models");
const waitTime = require("../utils/wait");
const queuesFactory = require("../data-structures/queue");

var urlsQueue = queuesFactory.getQueue();

function getDetailedActiorFromUrl(url) {
    console.log(`Extracting details from ${url}`);

    httpRequester.get(url)
        .then((result) => {
            const html = result.body;

            return htmlParser.TODO(html);
        })
        .then(detailedActior => {
            let dActior = modelsFactory.TODO(detailedActior);

            modelsFactory.TODO(dActior);
            console.log("inserting" + dActior.name);
            return waitTime.wait(constants)
        })
        .then(() => {
            if (urlsQueue.isEmpty()) {
                return;
            }

            getDetailedActiorFromUrl(urlsQueue.pop())
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
        getDetailedActiorFromUrl(urlsQueue.pop())
    }
}

module.exports.getImdbDetailedActiorFromUrls = getImdbDetailedActiorFromUrls;
module.exports.getImdbDetailedActiorFromUrlsArray = getImdbDetailedActiorFromUrlsArray;