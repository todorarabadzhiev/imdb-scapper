/* globals module require Promise */
"use strict";

const common = require("../utils/common");
const constants = require("../config/constants");
const jsdom = require("jsdom").jsdom,
    doc = jsdom(),
    window = doc.defaultView,
    $ = require("jquery")(window);

function parseSimpleMovie(selector, html) {
    $("body").html(html);
    let items = [];
    $(selector).each((index, item) => {
        const $item = $(item);

        items.push({
            title: $item.html(),
            url: $item.attr("href")
        });
    });

    return Promise.resolve()
        .then(() => {
            return items;
        });
};

function parseMovieCast(selector, html) {
    $("body").html(html);
    let items = [];
    $(selector).each((index, item) => {
        const $item = $(item);
        if ($item.hasClass("odd") || $item.hasClass("even")) {
            let name = $("td.itemprop a span", $item).text().trim();
            let role = $("td.character div", $item).text().trim();
            let photoUrl = $("td.primary_photo a img", $item).attr("loadlate") ||
                $("td.primary_photo a img", $item).attr("src");
            let url = $("td.itemprop a", $item).attr("href");
            let imdbId = common.extractImdbIdFromUrl(url,
                constants.stringNameBeforeImdbIdInUrl, constants.stringAfterImdbIdInUrl);
            items.push({
                name,
                imdbId,
                role,
                photoUrl
            });
        };
    });

    return Promise.resolve()
        .then(() => {
            return items;
        });
};

function parseMovieDetails(html) {
    $("body").html(html);
    let items = {};
    const $poster = $(constants.posterSelector);
    const $trailer = $(constants.trailerSelector);
    const $description = $(constants.descriptionSelector);
    const $releaseDate = $(constants.releaseDateSelector);
    const $title = $(constants.titleSelector);

    let genres = [];
    $(constants.genresSelector).each((index, genre) => {
        const $genre = $(genre);
        genres.push($genre.html());
    });

    let posterUrl = $poster.attr("src");
    let trailerUrl = $trailer.attr("href");
    let description = $description.text().trim();
    if (trailerUrl) {
        trailerUrl = constants.imdbSiteUrl + trailerUrl;
    }
    let releaseDate = $(constants.releaseDateSubSelector, $releaseDate).parent()
        .clone().find('span').remove().end().text().replace(constants.releaseDateStr, '').trim();
    let title = $title.text().trim();

    let movie = {
        title,
        releaseDate,
        coverImage: posterUrl,
        trailer: trailerUrl,
        description,
        genres
    }
    parseMovieCast(constants.castSelctor, html)
        .then(cast => {
            movie.cast = cast;
        });

    return Promise.resolve()
        .then(() => {
            return movie;
        });
};

function parseDetailActior(html) {
    $("body").html(html);
    let items = {};

    const $image = $(constants.detailedActiorImageSelector);
    const $name = $(constants.detailedActiorNameSelector);
    const $bio = $(constants.detailedActiorBioSelector);
}

module.exports.parseSimpleMovie = parseSimpleMovie;
module.exports.parseMovieDetails = parseMovieDetails;