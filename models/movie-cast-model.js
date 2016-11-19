/* globals require module */
"use strict";

const constants = require("../config/constants");
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let MovieCastSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String
    },
    imdbId: {
        type: String,
        required: true
    }
});

let modelName = constants.movieCastModelName;
mongoose.model(modelName, MovieCastSchema);
let MovieCast = mongoose.model(modelName);

module.exports = MovieCast;