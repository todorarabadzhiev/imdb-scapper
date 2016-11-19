/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const modelFactory = require("./index");

// let MovieDetailsSchema = new Schema({
//     imageLink: {
//         type: String,
//         required: true
//     },
//     trailerLink: {
//         type: String,
//         required: false
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     genres: {
//         type: [String],
//         required: true
//     },
//     releaseDate: {
//         type: Date,
//         required: true
//     },
//     actiors: {
//         type: [SimpleActiorSchema],
//         required: true
//     }
// });

// let MovieDetails;

// // virtual things if needed
// MovieDetails.statics.getMoviesDetails =
//     function(imageLink, trailerLink, title, description, genres, releaseDate, actiors) {

//         var mappedActiors = actiors.map(v => {
//             modelFactory.getSimpleActior(v.roleName, v.actiorName, v.pictureLink, v.imdbId);
//         });

//         return new MovieDetails({
//             imageLink,
//             trailerLink,
//             title,
//             description,
//             genres,
//             releaseDate,
//             actiors: mappedActiors
//         })
//     };

// mongoose.model("MovieDetails", MovieDetailsSchema);
// MovieDetails = mongoose.model("MovieDetails");
// module.exports = MovieDetails;