//node.js script for maps' integration
var fs = require('fs');

var pathFolder = 'www/json';    //basic maps' folder

function read(dir) {

    fs.readdir(dir, function(err, items) {

        //Exit from recursion
        if(items === undefined) {
            var fileName = dir.split('/').pop().slice(0, -8);
            var extension = dir.split('/').pop().slice(-8);
            //Making a file to write
            var mapArr = dir.split('/');
            mapArr.splice(mapArr.length - 1, 1);
            var writableFile = mapArr.join('/') + '/map.js';

            if (extension == '.geojson'){
                getContents(fileName, dir, writableFile);
            }

            return;
        }

        for (var i = 0; i < items.length; i++) {
            read(dir + '/' + items[i]);
        }
    });

}

function clearMap(dir){
    var items = fs.readdirSync(dir);
    for (var i = 0; i < items.length; i++){
        if (fs.statSync(dir + '/' + items[i]).isDirectory())
            clearMap(dir + '/' + items[i]);
        else
            fs.writeFileSync(dir + '/' + 'map.js', '', 'utf8');
    }
}

function getContents(varName, fileToRead, fileToWrite) {

    fs.readFile(fileToRead, 'utf8', 'r', function (err, contents) {
        var data = 'var ' + '_' + varName + ' = ' + contents + '\n\r';

        var writableText = fs.readFileSync(fileToWrite, 'utf8');
        varName = '_' + varName;

            append(data, fileToWrite, varName);
    });

}

function append(data, pathFile, varName){

    fs.appendFile(pathFile, data, function(err){
        if (!err)
            console.log(varName + " has been appended to map file");
    });

}

clearMap(pathFolder); //Preparating map.js folders to possible new configuration by deleting old data
read(pathFolder);

//This is a node.js script which changes the side menu when
//the menu folders add and remove.');
setTimeout(configurator, 1000);

function configurator(){

var pathFolder = 'www/json';
var menuPath = 'www/templates/side-menu.html';  //the menu file
var statePath = 'www/js/app.js';
var dirs = [];

appendResolve();

var content = fs.readFileSync(statePath, 'utf8');
readStates(content, ',');

String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
}

rewriteMaps(menuPath, pathFolder, dirs);

// rewriteIndex(dirs);

function appendResolve(){
    var mapFolders = fs.readdirSync('www/json');
    for(var i = 0; i < mapFolders.length; i++){
        var content = fs.readFileSync('www/json/' + mapFolders[i] + '/map.js', 'utf8');
        fs.writeFileSync('www/json/' + mapFolders[i] + '/map.js', content + '\n\rmapDeferred.resolve();');

                //Add geoJson variables
                content = fs.readFileSync('www/json/' + mapFolders[i] + '/map.js', 'utf8');

                var regexp = new RegExp("_(.*)(?==)", 'gim');
                var variables = content.match(regexp);

                // var content = fs.readFileSync('www/json/' + stateWord.capitalize() + '/config.js', 'utf8');
                content = content.split("mapDeferred.resolve();");

                var begin = "\n\t" + mapFolders[i].toLowerCase() + " = [";
                var end = "\n\t]";
                content[1] = end + content[1];
                    for(var k = 0; k < variables.length; k++){
                        content[1] = '\n\t\t' + "{ " + variables[k].trim() + ": " + variables[k].trim() + " }," + content[1];
                    }
                content[1] = begin + content[1];
                content = content.join("mapDeferred.resolve();");
                fs.writeFileSync('www/json/' + mapFolders[i] + '/map.js', content, 'utf8');
        
    }
}

//side menu rewriting
function rewriteMaps(file, baseFolder, dirs){

    recursion(pathFolder, dirs);

    dirs = getContent(dirs);

    //read old state of side-menu
    var content = fs.readFileSync(menuPath, 'utf8');
    content = content.split('<!-- Regular expression mark. Don\'t remove! -->');

        //create menu items
        writeMapItems(menuPath, content, dirs);

        writeStates(statePath, dirs);

}

//recursive reading map folder
function recursion(path, dirs){

    var items = fs.readdirSync(path);
    var counter = 0;
    var configFile;
    for (var i = 0; i < items.length; i++){
        var subpath = path + '/' + items[i];
        if (fs.statSync(subpath).isDirectory()){
            dirs[subpath] = '';
            recursion(subpath, dirs);
        }
        else {
            if(items[i].slice(0, 6) == 'config'){
                counter++;
                configFile = items[i];
            }
        }
    }

    if (counter != 0)
        dirs[path] = configFile;

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
    var description;
    // var oldStates = readStates(content[1], '>');
    // var newStates = [];

    for (var i = 0; i < content.length; i++) {
            if (i == 0){
                fs.writeFileSync(file, content[0] + '<!-- Regular expression mark. Don\'t remove! -->', 'utf8');
            }

        if (i == 1) {

            content[1] = '';
            for (var map in dirs) if(dirs.hasOwnProperty(map)) {

                state = map.split('/').pop().toLowerCase();
                // var config = fs.readFileSync('www/json/' + )
                var desc = dirs[map].split('description:').pop();
                desc = desc.split(',');
                desc[0] = desc[0].trim().substring(1, desc[0].length - 2);
                // newStates.push(state);

                            var pattern =
                            '\n              <ion-item class="item-icon-left" nav-clear menu-close ui-sref="app.' +  state + '">' + '\n' +
                            '                <i class="icon ion-wand"></i>' + '\n' +
                            '                <h2 id="' + state + '_item" class="menu-text map_item">' + map.split('/').pop() + '</h2>' + '\n' +
                            '                <small id="' + state + '_desc">' + desc[0] + '</small>' + '\n' +
                            '              </ion-item>' + '\n';
                fs.appendFileSync(file, pattern, 'utf8');

            }
        }

        if (i == 2){
            fs.appendFileSync(file, '<!-- Regular expression mark. Don\'t remove! -->' + content[2], 'utf8');

        }

            //it works if one of the map folders was renamed
            // if (oldStates.length == newStates.length)
            //     writeStateItems(oldStates, newStates);

    }
    console.log("The menu has been rewritten");
}

//Auxiliary parsing function
function readStates(content, sign1, sign2) {
    var states = [];
    var pieces = content.split(sign1);
    for (var i = 1; i < pieces.length; i++) {
        var elem = pieces[i].split(sign2)[0].trim();
        elem = elem.replace(/\'/gim, '').replace(/\"/gim, '');;
        states.push(elem);
    }
    return states;
}

function writeStates(statePath, dirs) {
    var content = fs.readFileSync(statePath, 'utf8');
    var stateWords = readStates(content, 'app.', ',');
    var target = content.split('$stateProvider');
    var counter = 0;

    //check if app.js hasn't a necessarily state and add needed
    //state and controller for this case
    for(var dir in dirs) if(dirs.hasOwnProperty(dir)){
        var stateWord = dir.split('/').pop().toLowerCase();
        for(var i = 0; i < stateWords.length; i++){
            if(stateWord == stateWords[i])
                counter++;
        }

        if(counter == 0){
            //add a state if json/ folder has a new map subfolder

            target[2] = "\n\n  .state('app." + stateWord + "', {\n" +
                        "\t\turl: '/layouts/" + stateWord + "',\n" +
                        "\t\tviews: {\n" +
                          "\t\t'menuContent': {\n" +
                            '\t\ttemplateUrl: "' + stateWord + '.html",\n' +
                            "\t\tcontroller: '" + stateWord + "Ctrl',\n" +
                            "\t\tresolve: {\n" +
                                    "\t\t\tlink: function($q){\n" +
                                        "\t\t\t\tvar defer = $q.defer();\n" +
                                        "\t\t\t\twindow.mapDeferred  = defer;\n" +
                                        "\t\t\t\tlinkCreator('" + stateWord.capitalize() + "');\n" +
                                        "\t\t\t\treturn defer.promise;\n" + 
                                  "\t\t\t}\n" +
                                "\t\t}\n" +
                          "\t\t}\n" +
                          "\t}\n" +
                          "})" + target[2];

            content = target.join('$stateProvider');
            fs.writeFileSync(statePath, content, 'utf8');

            //create a new template file for according state
            
              var content = '\n<ion-view class="layouts-view">\n' +
                                '\t<ion-nav-title>\n' +
                                    '\t\t<span id="map_name" style="color: white">' + stateWord.capitalize() + '</span>\n' +
                                '\t</ion-nav-title>\n' +
                                '\t<ion-content scroll="false" data-tap-disabled="true">\n' +
                                    '\t\t<div style="position: absolute; top: 5px; bottom: 0px; left: 0px; right: 0px;">\n' +
                                        '\t\t\t<leaflet\n' +
                                                '\t\t\t\tid="' + stateWord + '"\n' +
                                                '\t\t\t\tlayers="layers"\n' +
                                                '\t\t\t\tmaxBounds="maxBounds"\n' +
                                                '\t\t\t\tdefaults ="defaults"\n' +
                                                '\t\t\t\tmarkers="markers"\n' +
                                                '\t\t\t\tcenter = "center"\n' +
                                                '\t\t\t\twidth="100%"\n' +
                                                '\t\t\t\theight="100%">\n' +
                                        '\t\t\t</leaflet>\n' +
                                    '\t\t</div>\n' +
                                '\t</ion-content>\n' +
                            '</ion-view>\n'

                fs.writeFileSync("www/templates/" + stateWord + ".html", content, 'utf8');

                //add a controller to the controllers.js if needed

                var ctrlPath = 'www/js/controllers.js';
                content = fs.readFileSync(ctrlPath, 'utf8');
                var ctrlNames = readStates(content, '.controller(', ',');
                

                var count = 0;
                var testWord = stateWord + 'Ctrl';
                for (var j = 0; j < ctrlNames.length; j++){
                    if(ctrlNames[j] == testWord)
                        count++;
                }

                if(count == 0){ 
                    content = content.split("angular.module('MapAble.controllers', [])");

                    content[1] =    '\n\t\t.controller("' + stateWord + 'Ctrl", ["$scope", "leafletData", \n' +
                                                '\t\t\tfunction($scope, leafletData){\n' +
                                                            '\t\t\tleafletData.getMap("' + stateWord + '").then(function(map) {\n' +
                                            '\t\t\t\tvar layer;\n' +
                                            '\t\t\t\tvar index;\n' +
                                            '\t\t\t\tvar layerLabel;\n' +
                                            '\t\t\t\tvar indexLabel;\n' +
                                            '\t\t\t\tvar jsonVars = ' + stateWord + ';\n' +
                                            '\t\t\t\tfor(var i = 0; i < jsonVars.length; i++){\n' +
                                                '\t\t\t\t\tfor (var name in jsonVars[i]) if(jsonVars[i].hasOwnProperty(name)){\n' +
                                                    '\t\t\t\t\t\tif(name != "_labels"){\n' +
                                                        '\t\t\t\t\t\t\tlayer = name;\n' +
                                                        '\t\t\t\t\t\t\tindex = i;\n' +
                                                    '\t\t\t\t\t\t}\n' +
                                                    '\t\t\t\t\t\telse if(name == "_labels"){\n' +
                                                        '\t\t\t\t\t\t\tlayerLabel = name;\n' +
                                                        '\t\t\t\t\t\t\tindexLabel = i;\n' +
                                                    '\t\t\t\t\t\t}\n' +
                                                '\t\t\t\t\t}\n' +
                                            '\t\t\t\t}\n' +
                                            '\t\t\t\tL.geoJson(jsonVars[index][layer], {\n' +
                                                '\t\t\t\t\tstyle: {\n' +
                                                    '\t\t\t\t\t\tcolor: "grey",\n' +
                                                    '\t\t\t\t\t\tfillColor: "#f5e213",\n' +
                                                    '\t\t\t\t\t\tfillOpacity: 0.5,\n' +
                                                    '\t\t\t\t\t\tweight: "1"\n' +
                                                '\t\t\t\t\t}\n' +
                                            '\t\t\t\t}).addTo(map);\n' +
                                            '\t\t\t\tL.geoJson(jsonVars[indexLabel][layerLabel], {\n' +
                                                '\t\t\t\t\tstyle: {\n' +
                                                    '\t\t\t\t\t\tcolor: "grey",\n' +
                                                    '\t\t\t\t\t\tfillColor: "#f5e213",\n' +
                                                    '\t\t\t\t\t\tfillOpacity: 0.5,\n' +
                                                    '\t\t\t\t\t\tweight: "1"\n' +
                                                '\t\t\t\t\t}\n' +
                                            "\t\t\t\t}).addTo(map);\n" +
                                        '\t\t\t})\n' + 
                                    '\t\t}])' + content[1];


                    content = content.join("angular.module('MapAble.controllers', [])");
                    fs.writeFileSync(ctrlPath, content, 'utf8');
                }
                count = 0;

                // Add a properties object in attributes.js and set a default color
                contentAttrs = fs.readFileSync('www/js/attributes.js', 'utf8');
                var contentSplitted = contentAttrs.split('var layerAttrs = {');
                content = fs.readFileSync('www/json/' + stateWord.capitalize() + '/map.js', 'utf8');
                var regexp = new RegExp("_(.*)(?==)", 'gim');
                var variables = content.match(regexp);
                for(var z = 0; z < variables.length; z++){
                    var targetVar = "LayerPoly" + variables[z].trim();
                    if(contentAttrs.search(targetVar) == -1){
                        contentSplitted[1] = "\n\t\t\tLayerPoly" + variables[z].trim() + ": {" +
                                          '\n\t\t\t\tcolor: "rgba(204,231,140,1)",' +
                                          '\n\t\t\t\tdataName: "' + variables[z].trim() + '"' +
                                          '\n\t\t\t},' + contentSplitted[1];
                    }
                }

                contentAttrs = contentSplitted.join('var layerAttrs = {');
                fs.writeFileSync('www/js/attributes.js', contentAttrs, 'utf8');

        }
            counter = 0;
    }

}

}






