/* globals console require setTimeout Promise */
'use strict';

const dataProvider = require("./data-providers");

// dataProvider.getImdbSimpleMovies();
// dataProvider.getMoviesDetailedData();

let title = "The Story of Us (1999)";
dataProvider.getActorsData(title);