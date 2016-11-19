/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let SimpleActiorSchema = new Schema({
    roleName: {
        type: String,
        required: true
    },
    actiorName: {
        type: String,
        required: true
    },
    // actually even actiors without picture have empty png
    pictureLink: {
        type: String,
        required: true
    },
    imdbId: {
        type: String,
        required: true
    }
});

mongoose.model("SimpleActior", SimpleActiorSchema);
SimpleActior = mongoose.model("SimpleActior");

let MovieDetailsSchema = new Schema({
    imageLink: {
        type: String,
        required: true
    },
    trailerLink: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    actiors: {
        type: [SimpleActiorSchema],
        required: true
    }
});

let MovieDetails;

// virtual things if needed
MovieDetails.statics.getMoviesDetails =
    function(imageLink, trailerLink, title, description, genres, releaseDate, actiors) {

        var mappedActiors = actiors.map(v => {
            new SimpleActior({
                roleName: v.roleName,
                actiorName: c.actiorName,
                pictureLink: v.pictureLink,
                imdbId: v.imdbId
            });
        })

        return new MovieDetails({
            imageLink,
            trailerLink,
            title,
            description,
            genres,
            releaseDate,
            actiors:mappedActiors
        })
    };

mongoose.model("MovieDetails", MovieDetailsSchema);
MovieDetails = mongoose.model("MovieDetails");
module.exports = MovieDetails;