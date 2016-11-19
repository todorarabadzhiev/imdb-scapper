const constants = require("../config/constants");
const httpRequester = require("../utils/http-requester");
const htmlParser = require("../utils/html-parser");
const modelsFactory = require("../models");
const waitTime = require("../utils/wait");
const queuesFactory = require("../data-structures/queue");

var queueUrls = queuesFactory.getQueue();

