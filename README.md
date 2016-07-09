#Instructions

## 1. Getting started

- define a subfolder (like /www/json/somesubfolder) which will contain all map layers
- one subfolder - one map
- add all layers of map in .geojson extension to subfolder
- add config.js file in which define description of map and other global properties like
  simplification, font of labels, etc.	
- Description:
  It will be caused to appear according item in the menu. After description also define 
  at least mapName propertie to correct working build script.

## 2. Compile app
- To compile the application perform `npm run build`  in terminal after adding .geojson files
  and defining properties in config.js
- Description:
- it will create map.js file (by running of configurator.js) in the subfolder which contains
  all geojson obects (aka layers) assigned to javascript variables.
  This variables will being operated in any part of application to render the map
  associated with them
  The build script will create geoJson vars in the end of the map.js file. You may 
  change them order: it will lead to changing of orders of map layers.
- it will create all dependencies which is necessary to out of box map appearance
- it will render one layer of the map and one layer named labels.geojson (it's necessary
  to put in a map folder a label.geojson file to display this file and one of other layers by default)
- for example see existing map (locating in mainMap subfolder), consisting from 9 layers

## 3. Run app

- To run the application perform `ionic serve`
- To run the app on device perform "cordova run android/cordova run ios"
- Description:
`ionic serve` will launch the app in browser
`cordova run android/cordova run ios` will launch the app on device without an installation

## 4. Project structure
- A base directory of project is www/
- CSS folder is for styles
- dist folder is for files which will be displayed in browser
  Files in this folder appear automatically
- IMG folder is for images and icons
- JS folder is for business logic of the app
- basic folder where the maps locate is /www/json
  Subfolders of json folder are map folders
- configuratr.js is a script which compiles the app by performing of `npm run build`

## 5.Notifications

To add some labels to a map, define it as labels.geojson and put into a map subfolder.
Then run "npm run build" and use variable _labels in any place of your application.
See Countries map for example in which _cities labels been added.

To know country name in a popup do one click within its bounds
To know country attributes in top right corner of the map
mouse over country's bounds

See existing maps for example how to configure new maps if this instruction are some vague


