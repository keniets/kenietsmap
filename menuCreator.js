var fs = require('fs');

var pathFolder = 'www/json';
var menuPath = 'www/templates/side-menu.html';  //side menu file
var dirs = [];

deleteMaps(menuPath, pathFolder, findFolders);

function deleteMaps(file, baseFolder, callback){

    fs.readFile(file, 'utf8', 'r', function (err, contents) {

        text = contents.split('<!-- Regular expression mark. Don\'t remove! -->');

        writeAppend(file, text);
        
    });
}

function writeText(fileContent, fileToWrite) {
    fs.writeFile(fileToWrite, fileContent, 'utf8', 'w', function(err){
        if (!err)
            console.log('the file is rewritten');
    });
}

function writeAppend(file, content){

    content[1] = '';
    var dirs = [];
    fs.readdir(pathFolder, function(err, items) {
        for (var i = 0; i < items.length; i++) {

                content[1] +=
                '\n              <ion-item class="item-icon-left" nav-clear menu-close ui-sref="app.' +  items[i].toLowerCase() + '">' + '\n' +
                '                <i class="icon ion-wand"></i>' + '\n' +
                '                <h2 class="menu-text map_item">' + items[i] + '</h2>' + '\n' +
                '              </ion-item>' + '\n';

        }

        fs.writeFile(file, content[0] + '<!-- Regular expression mark. Don\'t remove! -->', 'utf8', 'w',
            function() {
                fs.appendFile(file, content[1], function(err){
                    fs.appendFile(file, '<!-- Regular expression mark. Don\'t remove! -->' + content[2], function(err){

                    });
                });
            });

    });

}

function append(data, pathFile){

    fs.appendFile(pathFile, data, function(err){
        if (!err)
            console.log("appended");
    });

}

function insertMap(file, dir){

    fs.readFile(file, 'utf8', 'r', function (err, contents) {

        var index = contents.match(/<-- Regular expression mark. Don't remove! -->/gim);
        console.log(index);

    });
}

function findFolders(file, baseFolder, callback) {

    fs.readdir(baseFolder, function(err, items) {
        for (var i = 0; i < items.length; i++) {
            fs.stat(baseFolder + '/' + items[i], function(err, stats){
                if (stats.isDirectory())
                    callback(file, items[i]);
            });
        }
    });

}


