/* globals require module */
"use strict";

const constants = require("../config/constants");
const common = require("../utils/common");
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let SimpleMovieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imdbId: {
        type: String,
        required: true
    }
});

let SimpleMovie;
SimpleMovieSchema.statics.getSimpleMovieByNameAndUrl =
    function(name, url) {
        let imdbId = common.extractImdbIdFromUrl(url,
            constants.stringTitleBeforeImdbIdInUrl, constants.stringAfterImdbIdInUrl);
        return new SimpleMovie({ name, imdbId });
    };

SimpleMovieSchema.virtual.imdbUrl = function() {
    let url = constants.compiledImdbTitlePlusUrl({
        'imdbId': this.imdbId
    });
    return url;
};

let modelName = constants.simpleMovieModelName;
mongoose.model(modelName, SimpleMovieSchema);
SimpleMovie = mongoose.model(modelName);
module.exports = SimpleMovie;