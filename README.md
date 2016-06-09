How to integrate a new map to the project:

- basic folder where the maps locate is /www/json
- define a subfolder (like /www/json/somesubfolder) which will contain all map layers
- one subfolder - one map
- add all layers of map in .geojson extension to subfolder
- run "node initMaps.js" in terminal
- initMaps.js will create map.js file in the subfolder which contains
  all geojson obects (aka layers) assigned to javascript variables.
  This variables will being operated in any part of application to render the map
  associated with them
- it's necessary to include map.js to view
- for example see existing map (locating in mainMap subfolder), consisting from 9 layers

How to automatically define the maps in the side menu

- put .txt file with the description of the map in the map subfolder (/www/json/mapsubfolder)
- run "node menuCreator.js"
- Map items and its descriptions will be appear in the side-menu  
