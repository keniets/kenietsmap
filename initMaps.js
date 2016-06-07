var fs = require('fs');

var pathFolder = 'www/json';

fs.stat(pathFolder, function(err, stats){
    read(pathFolder)
});

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
                console.log("fileName: " + fileName);
                console.log("extension: " + extension);
                console.log("readableFile: " + dir);
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
        console.log(data.substring(0, 30));
        write(data, fileToWrite);
    });

}



function write(data, pathFile){

    fs.appendFile(pathFile, data, function(err){
        if (!err)
            console.log("appended");
    });

}


