/* globals require module */
"use strict";

const constants = require("../config/constants");
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let detailedActiorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    bio: {
        type: String
    },
    movies: [{
        movieName: String,
        movieId: String,
        role: String
    }]
});

let ActiorDetails;

detailedActiorSchema.statics.getDetailedActior =
    function(actor) {
        return new ActiorDetails({
            name: actor.name,
            image: actor.image,
            bio: actor.bio,
            movies: actor.movies
        })
    };

let modelName = constants.detailedActiorModelName;
mongoose.model(modelName, detailedActiorSchema);
ActiorDetails = mongoose.model(modelName);
module.exports = ActiorDetails;