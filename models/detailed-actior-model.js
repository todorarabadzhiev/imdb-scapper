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
    function(actior) {
        return new ActiorDetails({
            name: actior.name,
            image: actior.image,
            bio: actior.bio,
            movies: actior.movies
        })
    };

let modelName = constants.detailedActiorModelName;
mongoose.model(modelName, detailedActiorSchema);
ActiorDetails = mongoose.model(modelName);
module.exports = ActiorDetails;