require.config({

	paths: {
		'domReady': '/lib/requirejs-domready/domReady',
	    'angular': '/lib/angular/angular',
	    'ionic_css': 'css/ionic.app',
	    'leaflet': 'lib/leaflet/dist/leaflet',
	    'leaflet_label_css': 'lib/leaflet/dist/leaflet.label',
	    'markerCluster': 'leaflet/dist/MarkerCluster',
	    'markerClusterDefault': 'lib/leaflet/dist/MarkerCluster.Default',
	    'ionic_bundle': 'lib/ionic/js/ionic.bundle',
	    'angular-resource': 'lib/angular-resource/angular-resource.min',
	    'underscore': 'lib/underscore/underscore-min',
	    'ng-cordova': 'lib/ngCordova/dist/ng-cordova.min',
	    'moment': 'lib/moment/min/moment.min',
	    'angular-moment': 'lib/angular-moment/angular-moment.min',
	    'angular-slugify': 'lib/angular-slugify/dist/angular-slugify.min',
	    'collide': 'lib/collide/collide.js',
	    'leaflet-directive': 'lib/angular-leaflet-directive/dist/angular-leaflet-directive.min',
	    'geojson-vt': 'lib/geojson-vt/geojson-vt-dev',
	    'canvas-tiles': 'lib/geojson-vt/L.CanvasTiles',
	    'leaflet_label_js': 'lib/leaflet/dist/leaflet.label',
	    'leaflet-markercluster': 'lib/leaflet/dist/leaflet.markercluster',
	    'app': 'dist/dist_js/app/app'
	},

    shim: {
	    'angular': {
	        exports: 'angular'
	    }
    },

    deps: ['./bootstrap']

});