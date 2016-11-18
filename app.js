/* globals console require setTimeout Promise */
'use strict';

const constants = require("./config/constants");
const simpleMovieProvider = require("./utils/simple-movie-provider");
const urlProvider = require("./utils/url-provider");

const urlArray = urlProvider.urlsQueue;
Array.from({ length: constants.asyncPagesCount })
    .forEach(() => simpleMovieProvider.getMoviesFromUrl(urlArray.items[0]));