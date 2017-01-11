'use strict';

module.exports = function(fileContent, path) {

    var storage = [];

    var content = fileContent.replace(/<!--([\s\S]+?)-->/gm, function(match, contents) {
        var newlinesCount = (contents.match(/\n/g) || []).length;
        var output = '<!--##' + storage.length + (new Array(newlinesCount + 1)).join('\n') + '##-->';
        storage.push(contents);
        return output;
    });

    var lines = content.split('\n');
    content = lines.map(function(line, lineNumber) {

        return line.replace(/<(?!xsl:|func:)[a-z0-9_:]+(?=\s|\/|>)/ig, function(node) {
            return node + ' source="' + path + ':' + (lineNumber + 1) + '"';
        });
        
    }).join('\n');

    content = content.replace(/<!--##(\d+)\n*##-->/g, function(match, contents) {
        return '<!--' + storage[contents] + '-->';
    });

    return content;
};