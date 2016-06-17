How to integrate a new map to the project:

- basic folder where the maps locate is /www/json
- define a subfolder (like /www/json/somesubfolder) which will contain all map layers
- one subfolder - one map
- add all layers of map in .geojson extension to subfolder
- perform "npm run build"  in terminal
- it will create map.js file (by running of initMaps.js) in the subfolder which contains
  all geojson obects (aka layers) assigned to javascript variables.
  This variables will being operated in any part of application to render the map
  associated with them
- it's necessary to include map.js to view
- for example see existing map (locating in mainMap subfolder), consisting from 9 layers

How to automatically define the maps in the side menu

- put .txt file with the description of the map in the map subfolder (/www/json/mapsubfolder)
- perform "npm run build"  in terminal
- map items and its descriptions will be appeared in the side-menu  
- if you add a new map subfolder you also need to add according state to ui route (app.js for now)
  The name of a state consist of "app." + the name of a map subfolder in lowercase
  for example: app.main, app.nationalities, app.countries, etc	

You may rename map folder, then run "npm run build" and this change will appear in
ui routes file and index.html file. You must rename just one folder at a time and
then run "npm run build". After renaming restart the server by means of "ionic serve".

To add some labels to a map, assemble all labels in labels.geojson and put into a map subfolder.
Then run "npm run build" and use variable _labels in any place of your application.
See Countries map for example in which _cities labels been added.

To know country name in a popup do one click within its bounds
To know country attributes in top right corner of the map
mouse over country's bounds


