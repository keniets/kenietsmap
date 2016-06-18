//This is a node.js script which changes the side menu when
//the menu folders add, remove or rename. Also this script
//repairs ui routes and index.html automatically after
//above menu changes
var fs = require('fs');

var pathFolder = 'www/json';
var menuPath = 'www/templates/side-menu.html';  //the menu file
var statePath = 'www/js/app.js';
var dirs = [];

var content = fs.readFileSync(statePath, 'utf8');
readStates(content, ',');

String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
}

rewriteMaps(menuPath, pathFolder, dirs);

rewriteIndex(dirs);

//side menu rewriting
function rewriteMaps(file, baseFolder, dirs){

    recursion(pathFolder, dirs);

    dirs = getContent(dirs);

    var content = fs.readFileSync(menuPath, 'utf8');
    content = content.split('<!-- Regular expression mark. Don\'t remove! -->');

        writeMapItems(menuPath, content, dirs);

}

//recursive reading map folder
function recursion(path, dirs){

    var items = fs.readdirSync(path);
    var counter = 0;
    var txtFile;
    for (var i = 0; i < items.length; i++){
        var subpath = path + '/' + items[i];
        if (fs.statSync(subpath).isDirectory()){
            dirs[subpath] = '';
            recursion(subpath, dirs);
        }
        else {
            if(items[i].slice(-3) == 'txt'){
                counter++;
                txtFile = items[i];
            }
        }
    }

    if (counter != 0)
        dirs[path] = txtFile;

}

function getContent(data){

    for (var pair in data) if (data.hasOwnProperty(pair)) {
        if (data[pair] != ''){
            var path = pair + '/' + data[pair];
            data[pair] = fs.readFileSync(path, 'utf8');
        }
    }
    return data;
}

function writeMapItems(file, content, dirs) {

    var state;
    var oldStates = readStates(content[1], '>');
    var newStates = [];

    for (var i = 0; i < content.length; i++) {
            if (i == 0){
                fs.writeFileSync(file, content[0] + '<!-- Regular expression mark. Don\'t remove! -->', 'utf8');
            }

        if (i == 1) {

            content[1] = '';
            for (var map in dirs) if (dirs.hasOwnProperty(map))  {

                state = map.split('/').pop().toLowerCase();
                newStates.push(state);

                            var pattern =
                            '\n              <ion-item class="item-icon-left" nav-clear menu-close ui-sref="app.' +  state + '">' + '\n' +
                            '                <i class="icon ion-wand"></i>' + '\n' +
                            '                <h2 class="menu-text map_item">' + map.split('/').pop() + '</h2>' + '\n' +
                            '                <small>' + dirs[map] + '</small>' + '\n' +
                            '              </ion-item>' + '\n';
                var test = fs.appendFileSync(file, pattern, 'utf8');

            }
        }

        if (i == 2){
            fs.appendFileSync(file, '<!-- Regular expression mark. Don\'t remove! -->' + content[2], 'utf8');
        }

            //it works if one of the map folders was renamed
            if (oldStates.length == newStates.length)
                writeStateItems(oldStates, newStates);

    }
    console.log("The menu has been rewritten");
}

//Auxiliary parsing function
function readStates(content, sign) {
    var states = [];
    var pieces = content.split("app.");
    for (var i = 1; i < pieces.length; i++) {
        var elem = pieces[i].split(sign)[0].trim();
        states.push(elem.substring(0, elem.length - 1).trim());
    }
    return states;
}

function writeStateItems(oldStates, newStates){

    //create mutable copies of states arrays
    var oldStatesCopy = [];
    var newStatesCopy = [];

    for (var index = 0; index < oldStates.length; index++){
        oldStatesCopy.push(oldStates[index]);
        newStatesCopy.push(newStates[index]);
    }

    var counter = 0;
    var resultPairs = {};

    for (var i = 0; i < newStates.length; i++){
        for (var j = 0; j < oldStates.length; j++){
            if (newStates[i] == oldStates[j]){
                delete(newStatesCopy[i]);
                delete(oldStatesCopy[j]);
            }
        }
    }

    var older;
    var newer;
    for(var i = 0; i < oldStatesCopy.length; i++){
        if(oldStatesCopy[i] !== undefined)
            older = oldStatesCopy[i];
        if(newStatesCopy[i] !== undefined)
            newer = newStatesCopy[i];
    }

    //If map folder name was changed we will accordingly change the references to it
    //in ui routes(app.js for now) and index.html
    if(older !== undefined && newer != undefined){        //map folder name is changed
        var content = fs.readFileSync(statePath, 'utf8');
        var pieces = content.split("app.");
        for (var i = 1; i < pieces.length; i++) {
            var elem = pieces[i].split(',')[0].trim();
            elem = elem.substring(0, elem.length - 1).trim();
            if(elem == older)
                pieces[i] = pieces[i].replace(older, newer);
    }

        content = pieces.join("app.");
        fs.writeFileSync(statePath, content, 'utf8');
        console.log("The routes have been rewritten");
    }
}

function rewriteIndex(dirs){
    var content = fs.readFileSync('www/index.html', 'utf8');
    pieces = content.split("<!-- DATA LIBRARY. DON'T TOUCH/REMOVE THIS COMMENT! -->");

    for(var i = 0; i < pieces.length; i++){
        if(i == 0){
            fs.writeFileSync('www/index.html', pieces[0] + "<!-- DATA LIBRARY. DON'T TOUCH/REMOVE THIS COMMENT! -->", 'utf8');
        }

        if(i == 1){
            pieces[1] = '';
            for (var dir in dirs) if(dirs.hasOwnProperty(dir)){
                var pattern = '\n<script src="json/' + dir.split('/').pop() + '/map.js"></script>';
                pieces[1] += pattern;
            }
            fs.appendFileSync('www/index.html', pieces[1] + "\n<!-- DATA LIBRARY. DON'T TOUCH/REMOVE THIS COMMENT! -->", 'utf8');
        }

        if(i == 2){
            fs.appendFileSync('www/index.html', pieces[2], 'utf8');
        }
    }

}



