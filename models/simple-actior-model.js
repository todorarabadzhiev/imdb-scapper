/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

// let SimpleActiorSchema = new Schema({
//     roleName: {
//         type: String,
//         required: true
//     },
//     actiorName: {
//         type: String,
//         required: true
//     },
//     // actually even actiors without picture have empty png
//     pictureLink: {
//         type: String,
//         required: true
//     },
//     imdbId: {
//         type: String,
//         required: true
//     }
// });

// let SimpleActior;

// SimpleActior.statics.getSimpleActior =
//     function(roleName, actiorName, pictureLink, imdbId) {
//         return new SimpleActior({
//             roleName,
//             actiorName,
//             pictureLink,
//             imdbId
//         })
//     }

// mongoose.model("SimpleActior", SimpleActiorSchema);
// SimpleActior = mongoose.model("SimpleActior");

// module.exports = MovieDetails;