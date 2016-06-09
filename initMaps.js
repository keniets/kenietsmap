//node.js script for maps' integration
var fs = require('fs');

var pathFolder = 'www/json';    //basic maps' folder

read(pathFolder);

function read(dir) {

    fs.readdir(dir, function(err, items) {

        if(items === undefined) { //Exit from recursion
            var fileName = dir.split('/').pop().slice(0, -8);
            var extension = dir.split('/').pop().slice(-8);
            //Making a file to write
            var mapArr = dir.split('/');
            mapArr.splice(mapArr.length - 1, 1);
            var writableFile = mapArr.join('/') + '/map.js';

            if (extension == '.geojson'){
                getContent(fileName, dir, writableFile);
            }

            return;
        }

        for (var i = 0; i < items.length; i++) {
            read(dir + '/' + items[i]);
        }
    });
}

function getContent(varName, fileToRead, fileToWrite) {

    fs.readFile(fileToRead, 'utf8', 'r', function (err, contents) {
        var data = 'var ' + '_' + varName + ' = ' + contents + '\n\r';
        var test = 'var ' + '_' + varName + ' = ';

        //check if a layer is already written in map.js
        var writableText = fs.readFileSync(fileToWrite, 'utf8');
        var index = writableText.search(test);

        if (index == -1)
            append(data, fileToWrite);
    });

}

function append(data, pathFile){

    fs.appendFile(pathFile, data, function(err){
        if (!err)
            console.log("appended");
    });

}









