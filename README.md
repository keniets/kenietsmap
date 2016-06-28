How to integrate a new map to the project:

- basic folder where the maps locate is /www/json
- define a subfolder (like /www/json/somesubfolder) which will contain all map layers
- one subfolder - one map
- add all layers of map in .geojson extension to subfolder
- add config.js file in which define description of map, that will appear in the menu
- perform "npm run build"  in terminal
- it will create map.js file (by running of initMaps.js) in the subfolder which contains
  all geojson obects (aka layers) assigned to javascript variables.
  This variables will being operated in any part of application to render the map
  associated with them
- it will create all dependencies which is necessary to out-of-box map appearance
- it will render one layer of the map and one layer named "labels.geojson"
- for example see existing map (locating in mainMap subfolder), consisting from 9 layers


To add some labels to a map, assemble all labels in labels.geojson and put into a map subfolder.
Then run "npm run build" and use variable _labels in any place of your application.
See Countries map for example in which _cities labels been added.

To know country name in a popup do one click within its bounds
To know country attributes in top right corner of the map
mouse over country's bounds


