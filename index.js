'use strict';

module.exports = function(fileContent, path) {

    var storage = [];
    // сохраняем в «хранилище» все комментарии и заменяем на плейсхолдеры, на случай если в комментариях теги
    var content = fileContent.replace(/<!--([\s\S]+?)-->/gm, function(match, p1) {
        // считаем количество переносов строк, чтобы включить их в плейсхолдер и корректно считать номера строк
        var newlinesCount = (p1.match(/\n/g) || []).length;
        var output = '<!--##' + storage.length + (new Array(newlinesCount + 1)).join('\n') + '##-->';
        storage.push(p1);
        return output;
    });

    // CDATA-содержимое не трогаем, чтобы проставлять атрибут source в js-шаблонах
    
    // выбираем теги и дописываем атрибут source
    var lines = content.split('\n');
    content = lines.map(function(line, lineNumber) {

        return line.replace(/<(?!xsl:|func:)[a-z0-9_:]+(?=\s|\/|>)/ig, function(match) {
            // +1 потому что в массиве нумерация с нуля, а в редакторе - с единицы
            return match + ' source="' + path + ':' + (lineNumber + 1) + '"';
        });

    }).join('\n');

    // возвращаем комментарии
    content = content.replace(/<!--##(\d+)\n*##-->/g, function(match, p1) {
        return '<!--' + storage[p1] + '-->';
    });

    return content;
};
