angular.module('linkCreator', [])

.service('links', function(){
	var creator = function linkCreator(mapName){
		var mapRef = 'json/' + mapName + '/map.js';
		var configRef = 'json/' + mapName + '/config.js';
        var mapElem = document.createElement('script');
        var configElem = document.createElement('script');
        mapElem.setAttribute("type","text/javascript");
        mapElem.setAttribute("src", mapRef);
        configElem.setAttribute("type","text/javascript");
        configElem.setAttribute("src", configRef);

        var parent = document.getElementById("data_links");
        // var children = parent.getElementsByTagName("script");

        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }

        parent.appendChild(mapElem);
        parent.appendChild(configElem);

};
this.creator = 	creator;
});