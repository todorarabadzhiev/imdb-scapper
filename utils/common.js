module.exports = {
    extractImdbIdFromUrl(url, strBegin, strAfter) {
        let index = url.indexOf(strAfter);
        return url.substring(strBegin.length, index);
    }
}