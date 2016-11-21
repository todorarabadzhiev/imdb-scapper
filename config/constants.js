const _ = require("lodash");

module.exports = {
    connectionString: "mongodb://localhost/moviesDb",
    imdbSiteUrl: "http://www.imdb.com",
    genres: ["action", "sci-fi", "fantasy", "horror", "comedy"],
    movieSelctor: ".col-title span[title] a",
    castSelctor: "table.cast_list tr",
    posterSelector: "#title-overview-widget div.poster a img",
    trailerSelector: "#title-overview-widget div.slate a",
    titleSelector: "#title-overview-widget div.title_wrapper h1[itemprop='name']",
    descriptionSelector: "#titleStoryLine div[itemprop='description'] p",
    genresSelector: "#titleStoryLine div[itemprop='genre'] a",
    releaseDateSelector: "#titleDetails",
    releaseDateSubSelector: "h4:contains('Release Date:')",
    // DetailedActior
    detailedActiorImageSelector: "#name-poster",
    detailedActiorNameSelector: "#overview-top h1 span[itemprop ='name']",
    detailedActiorBioSelector: "#name-bio-text div[itemprop = 'description']",
    detailedActiorMoviesSelector: "div.filmo-category-section",

    simpleMovieModelName: "SimpleMovie",
    detailedMovieModelName: "MovieDetails",
    movieCastModelName: "MovieCast",
    detailedActiorModelName: "ActiorDetails",
    releaseDateStr: 'Release Date:',
    pagesCount: 50,
    asyncPagesCount: 20,
    timeout: 1000,
    stringAfterImdbIdInUrl: "/?ref",
    stringTitleBeforeImdbIdInUrl: "/title/",
    stringNameBeforeImdbIdInUrl: "/name/",
    compiledImdbSearchUrl: _.template("http://www.imdb.com/search/title?genres=<%= genre %>&title_type=feature&0sort=moviemeter,asc&page=<%= page %>&view=simple&ref_=adv_nxt"),
    compiledImdbTitlePlusUrl: _.template("http://imdb.com/title/<%= imdbId %>/?ref_=adv_li_tt"),
    compiledImdbTitleUrl: _.template("http://imdb.com/title/<%= imdbId %>/")
};