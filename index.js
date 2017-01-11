'use strict';

module.exports = function(fileContent, path) {

    var storage = [];

    var content = fileContent.replace(/<!--([\s\S]+?)-->/gm, function(match, p1) {
        var newlinesCount = (p1.match(/\n/g) || []).length;
        var output = '<!--##' + storage.length + (new Array(newlinesCount + 1)).join('\n') + '##-->';
        storage.push(p1);
        return output;
    });

    var lines = content.split('\n');
    content = lines.map(function(line, lineNumber) {

        return line.replace(/<(?!xsl:|func:)[a-z0-9_:]+(?=\s|\/|>)/ig, function(match) {
            return match + ' source="' + path + ':' + (lineNumber + 1) + '"';
        });

    }).join('\n');

    content = content.replace(/<!--##(\d+)\n*##-->/g, function(match, p1) {
        return '<!--' + storage[p1] + '-->';
    });

    return content;
};