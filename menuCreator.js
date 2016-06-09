var fs = require('fs');

var pathFolder = 'www/json';
var menuPath = 'www/templates/side-menu.html';  //side menu file
var dirs = [];

rewriteMaps(menuPath, pathFolder, dirs);

function rewriteMaps(file, baseFolder, dirs){

    recursion(pathFolder, dirs);

    dirs = getContent(dirs);

    var content = fs.readFileSync(menuPath, 'utf8');
    content = content.split('<!-- Regular expression mark. Don\'t remove! -->');

         writeMapItems(menuPath, content, dirs);

}

function recursion(path, dirs){

    // dirs = getChilds(path);
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

function getChilds(path){
    return fs.readdirSync(path);
}

function getContent(data){

    for (var pair in data){
        if (data[pair] != ''){
            var path = pair + '/' + data[pair];
            data[pair] = fs.readFileSync(path, 'utf8');
        }
    }
    return data;
}

function writeMapItems(file, content, dirs) {

    for (var i = 0; i < content.length; i++) {
            if (i == 0){
                fs.writeFileSync(file, content[0] + '<!-- Regular expression mark. Don\'t remove! -->', 'utf8');
            }

        if (i == 1) {
            content[1] = '';
            for (var map in dirs) if (dirs.hasOwnProperty(map))  {

                            var pattern =
                            '\n              <ion-item class="item-icon-left" nav-clear menu-close ui-sref="app.' +  map.split('/').pop().toLowerCase() + '">' + '\n' +
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
    }
}



