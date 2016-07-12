angular.module('MapAble.controllers', [])
		.controller("oceansCtrl", ["$scope", "leafletData", 
			function($scope, leafletData){
			leafletData.getMap("oceans").then(function(map) {
				var layer;
				var index;
				var layerLabel;
				var indexLabel;
				var jsonVars = oceans;
				for(var i = 0; i < jsonVars.length; i++){
					for (var name in jsonVars[i]) if(jsonVars[i].hasOwnProperty(name)){
						if(name != "_labels"){
							layer = name;
							index = i;
						}
						else if(name == "_labels"){
							layerLabel = name;
							indexLabel = i;
						}
					}
				}

				for(var i = 0; i < jsonVars.length; i++){
					for (var name in jsonVars[i]) if(jsonVars[i].hasOwnProperty(name) && name != "_labels"){

						var layer = geojsonvt(jsonVars[i][name]);
						// simplification tolerance (higher means simpler)
						// you need set it to 30-40 at least to feel the difference
						layer.options.tolerance = 5 // zones_config.tolerance;
						//Define max zoom to each level. After this zoom layers won't display
						layer.options.maxZoom = 9 //zones_config.layerMaxZoom;
						CenterMap(layer, "LayerPoly" + name,"oceans", leafletData);
					}
				}
				//L.geoJson(jsonVars[index][layer], {
				//	style: {
				//		color: "red",
				//		fillColor: "#11c1f3",
				//		fillOpacity: 0.1,
				//		weight: "1"
				//	}
				//}).addTo(map);
				L.geoJson(jsonVars[indexLabel][layerLabel], {
					style: {
						color: "red",
						fillColor: "#11c1f3",
						fillOpacity: 0.5,
						weight: "1"
					}
				}).addTo(map);
			})
		}])


/* APP*/
    .controller('AppCtrl', ['$scope', 'lang',
     function($scope, lang) {
    angular.extend($scope, {
		center: {
			 lat: 20,
			 lng: -80,
			 zoom: 2
		},
		layers: {
			overlays: {
				NorthAmerica: {
					name: "North America",
					type: "markercluster",
					visible: true
				},
				eastafrica: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				tibet: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				wasia: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				SouthAmerica: {
					name: "North America",
					type: "markercluster",
					visible: true
				},
				Eurasia: {
					name: "North America",
					type: "markercluster",
					visible: true
				}
			}
		},
        maxBounds:{
			southWest:{
				lat:-75,
				lng:-180
			},
			northEast:{
				lat:85,
				lng:180
			}
		},
		defaults: {
			maxZoom:8,
			minZoom:2,
			scrollWheelZoom: true,
			zoomAnimation: true,
            fadeAnimation: true,
            markerZoomAnimation: false,
            animate: false,
            zoomControl: false
		}
	});

}])

// WALKTHROUGH
.controller('WalkthroughCtrl', function($scope, $state) {
	$scope.goToLogIn = function(){
		$state.go('login');
	};

	$scope.goToSignUp = function(){
		$state.go('signup');
	};
})

.controller('LoginCtrl', function($scope, $state, $templateCache, $q, $rootScope) {
	$scope.goToSignUp = function(){
		$state.go('signup');
	};

	$scope.goToForgotPassword = function(){
		$state.go('forgot-password');
	};

	$scope.doLogIn = function(){
		$state.go('app.feeds-categories');
	};

	$scope.user = {};

	$scope.user.email = "john@doe.com";
	$scope.user.pin = "12345";

	// We need this for the form validation
	$scope.selected_tab = "";

	$scope.$on('my-tabs-changed', function (event, data) {
		$scope.selected_tab = data.title;
	});

})

.controller('SignupCtrl', function($scope, $state) {
	$scope.user = {};

	$scope.user.email = "john@doe.com";

	$scope.doSignUp = function(){
		$state.go('app.feeds-categories');
	};

	$scope.goToLogIn = function(){
		$state.go('login');
	};
})

.controller('ForgotPasswordCtrl', function($scope, $state) {
	$scope.recoverPassword = function(){
		$state.go('app.feeds-categories');
	};

	$scope.goToLogIn = function(){
		$state.go('login');
	};

	$scope.goToSignUp = function(){
		$state.go('signup');
	};

	$scope.user = {};
})

.controller('RateApp', function($scope) {
	$scope.rateApp = function(){
		if(ionic.Platform.isIOS()){
			//you need to set your own ios app id
			AppRate.preferences.storeAppURL.ios = '1234555553>';
			AppRate.promptForRating(true);
		}else if(ionic.Platform.isAndroid()){
			//you need to set your own android app id
			AppRate.preferences.storeAppURL.android = 'market://details?id=ionFB';
			AppRate.promptForRating(true);
		}
	};
})

.controller('SendMailCtrl', function($scope) {
	$scope.sendMail = function(){
		cordova.plugins.email.isAvailable(
			function (isAvailable) {
				// alert('Service is not available') unless isAvailable;
				cordova.plugins.email.open({
					to:      'envato@startapplabs.com',
					cc:      'hello@startapplabs.com',
					// bcc:     ['john@doe.com', 'jane@doe.com'],
					subject: 'Greetings',
					body:    'How are you? Nice greetings from IonFullApp'
				});
			}
		);
	};
})

.controller('AdsCtrl', function($scope, $ionicActionSheet, AdMob, iAd) {

	$scope.manageAdMob = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
				{ text: 'Show Banner' },
				{ text: 'Show Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				AdMob.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show Banner')
				{
					console.log("show banner");
					AdMob.showBanner();
				}

				if(button.text == 'Show Interstitial')
				{
					console.log("show interstitial");
					AdMob.showInterstitial();
				}

				return true;
			}
		});
	};

	$scope.manageiAd = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
			{ text: 'Show iAd Banner' },
			{ text: 'Show iAd Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show - Interstitial only works in iPad',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				iAd.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show iAd Banner')
				{
					console.log("show iAd banner");
					iAd.showBanner();
				}
				if(button.text == 'Show iAd Interstitial')
				{
					console.log("show iAd interstitial");
					iAd.showInterstitial();
				}
				return true;
			}
		});
	};
})

//brings all feed categories
.controller('FeedsCategoriesCtrl', function($scope, $http) {
	$scope.feeds_categories = [];

	$http.get('feeds-categories.json').success(function(response) {
		$scope.feeds_categories = response;
	});
})

//bring specific category providers
.controller('CategoryFeedsCtrl', function($scope, $http, $stateParams) {
	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;

	$http.get('feeds-categories.json').success(function(response) {
		var category = _.find(response, {id: $scope.categoryId});
		$scope.categoryTitle = category.title;
		$scope.category_sources = category.feed_sources;
	});
})

//this method brings posts for a source provider
.controller('FeedEntriesCtrl', function($scope, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {
	$scope.feed = [];

	var categoryId = $stateParams.categoryId,
			sourceId = $stateParams.sourceId;

	$scope.doRefresh = function() {

		$http.get('feeds-categories.json').success(function(response) {

			$ionicLoading.show({
				template: 'Loading entries...'
			});

			var category = _.find(response, {id: categoryId }),
					source = _.find(category.feed_sources, {id: sourceId });

			$scope.sourceTitle = source.title;

			FeedList.get(source.url)
			.then(function (result) {
				$scope.feed = result.feed;
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			}, function (reason) {
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			});
		});
	};

	$scope.doRefresh();

	$scope.readMore = function(link){
		window.open(link, '_blank', 'location=yes');
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkFeedPost(post);
	};
})

// Multimedia
.controller('MultimediaCtrl', function($scope) {

})

// SETTINGS
.controller('SettingsCtrl', ['$scope', '$ionicActionSheet', '$state', '$rootScope', 'lang',
 function($scope, $ionicActionSheet, $state, $rootScope, lang) {
	$scope.airplaneMode = true;
	$scope.wifi = false;
	$scope.bluetooth = true;
	$scope.personalHotspot = true;

	$scope.checkOpt1 = true;
	$scope.checkOpt2 = true;
	$scope.checkOpt3 = false;


	if(localStorage.getItem("language") == 'ru'){
		var element = document.getElementById("change_lang");
		element.innerHTML = "Язык";

		var menu = lang.langs.ru.menu;

		var map = document.getElementById("countries_item");
		var desc = document.getElementById("countries_desc");

		map.innerHTML = menu["Countries"];
		desc.innerHTML = menu["Countries map"];

	}

	if(localStorage.getItem("language") == 'en' || localStorage.getItem("language") === undefined){
		var elem = document.getElementById("change_lang");
		elem.innerHTML = "Language";

		var menu = lang.langs.ru.menu;

		var map = document.getElementById("countries_item");
		var desc = document.getElementById("countries_desc");

		map.innerHTML = "Countries";
		desc.innerHTML = "Countries map";
	}

	$scope.changeLang = function(value){
		localStorage.setItem('language', value);

		if(value == 'ru'){
			var elem = document.getElementById("change_lang");
			localStorage.setItem("change_lang", elem.innerHTML);
			elem.innerHTML = lang.langs[value].settings[elem.innerHTML];

		var menu = lang.langs[localStorage.getItem('language')].menu;

			var map = document.getElementById("countries_item");
			var desc = document.getElementById("countries_desc");

			map.innerHTML = menu["Countries"];
			desc.innerHTML = menu["Countries map"];

		}
		else if(value == 'en'){
			var elem = document.getElementById("change_lang");
			elem.innerHTML = localStorage.getItem("change_lang");

		var map = document.getElementById("countries_item");
		var desc = document.getElementById("countries_desc");

		map.innerHTML = "Countries";
		desc.innerHTML = "Countries map";
		}
		
	}

	// Triggered on a the logOut button click
	$scope.showLogOutMenu = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			// buttons: [
			// { text: '<b>Share</b> This' },
			// { text: 'Move' }
			// ],
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			buttonClicked: function(index) {
				//Called when one of the non-destructive buttons is clicked,
				//with the index of the button that was clicked and the button object.
				//Return true to close the action sheet, or false to keep it opened.
				return true;
			},
			destructiveButtonClicked: function(){
				//Called when the destructive button is clicked.
				//Return true to close the action sheet, or false to keep it opened.
				$state.go('login');
			}
		});

	};
}])

// FORMS
.controller('FormsCtrl', function($scope) {
})

// PROFILE
.controller('ProfileCtrl', function($scope) {
})

// BOOKMARKS
.controller('BookMarksCtrl', function($scope, $rootScope, BookMarkService, $state) {

	$scope.bookmarks = BookMarkService.getBookmarks();

	// When a new post is bookmarked, we should update bookmarks list
	$rootScope.$on("new-bookmark", function(event){
		$scope.bookmarks = BookMarkService.getBookmarks();
	});

	$scope.goToFeedPost = function(link){
		window.open(link, '_blank', 'location=yes');
	};
	$scope.goToWordpressPost = function(postId){
		$state.go('app.post', {postId: postId});
	};
})

// SLIDER
.controller('SliderCtrl', function($scope, $http, $ionicSlideBoxDelegate) {
})

// WORDPRESS
.controller('WordpressCtrl', function($scope, $http, $ionicLoading, PostService, BookMarkService) {
	$scope.posts = [];
	$scope.page = 1;
	$scope.totalPages = 1;

	$scope.doRefresh = function() {
		$ionicLoading.show({
			template: 'Loading posts...'
		});

		//Always bring me the latest posts => page=1
		PostService.getRecentPosts(1)
		.then(function(data){

			$scope.totalPages = data.pages;
			$scope.posts = PostService.shortenPosts(data.posts);

			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.loadMoreData = function(){
		$scope.page += 1;

		PostService.getRecentPosts($scope.page)
		.then(function(data){
			//We will update this value in every request because new posts can be created
			$scope.totalPages = data.pages;
			var new_posts = PostService.shortenPosts(data.posts);
			$scope.posts = $scope.posts.concat(new_posts);

			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	$scope.moreDataCanBeLoaded = function(){
		return $scope.totalPages > $scope.page;
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkWordpressPost(post);
	};

	$scope.doRefresh();
})

// WORDPRESS POST
.controller('WordpressPostCtrl', function($scope, $http, $stateParams, PostService, $ionicLoading) {

	$ionicLoading.show({
		template: 'Loading post...'
	});

	var postId = $stateParams.postId;
	PostService.getPost(postId)
	.then(function(data){
		$scope.post = data.post;
		$ionicLoading.hide();
	});

	$scope.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};
})


.controller('ImagePickerCtrl', function($scope, $rootScope, $cordovaCamera) {

	$scope.images = [];

	$scope.selImages = function() {

		window.imagePicker.getPictures(
			function(results) {
				for (var i = 0; i < results.length; i++) {
					console.log('Image URI: ' + results[i]);
					$scope.images.push(results[i]);
				}
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}, function (error) {
				console.log('Error: ' + error);
			}
		);
	};

	$scope.removeImage = function(image) {
		$scope.images = _.without($scope.images, image);
	};

	$scope.shareImage = function(image) {
		window.plugins.socialsharing.share(null, null, image);
	};

	$scope.shareAll = function() {
		window.plugins.socialsharing.share(null, null, $scope.images);
	};
})

// LAYOUTS
.controller('LayoutsCtrl', function($scope) {
})


.controller("zonesCtrl", [ '$scope', '$log', '$http', 'leafletData', 'attrService', '$rootScope', 'links', 'lang',
	function($scope, $log, $http, leafletData, attrService, $rootScope, links, lang) {

		if(localStorage.getItem('language') == 'ru'){
			var translations = lang.langs[localStorage.getItem('language')];
			angular.element(document).ready(function () {

				var mapNames = lang.langs.ru.mapNames;

				//Change language of map name
				// var mapName = document.getElementById("map_name");
				// mapName.innerHTML = mapNames["Climate Zones"];

				//Change language of menu
				var map = document.getElementById("countries_item");
				var desc = document.getElementById("countries_desc");

				var menu = lang.langs.ru.menu;

				map.innerHTML = menu["Countries"];
				desc.innerHTML = menu["Countries map"];

			});
		}

		leafletData.getMap("zones").then(function(map) {
			//Add zoom button to the map
			L.control.zoom().addTo(map);
		});

		var jsonVars = zones;
		for(var i = 0; i < jsonVars.length; i++){
			for (var name in jsonVars[i]) if(jsonVars[i].hasOwnProperty(name)){

				var layer = geojsonvt(jsonVars[i][name]);
					// simplification tolerance (higher means simpler)
		    		// you need set it to 30-40 at least to feel the difference
		    		layer.options.tolerance = zones_config.tolerance; 
		    		//Define max zoom to each level. After this zoom layers won't display
		    		layer.options.maxZoom = zones_config.layerMaxZoom;
				CenterMap(layer, "LayerPoly" + name, "zones", leafletData);
			}
		}

	}])

.controller("nationalitiesCtrl", [ '$scope', '$log', '$http', 'leafletData', 'attrService', '$rootScope', 'lang', 'links',
	function($scope, $log, $http, leafletData, attrService, $rootScope, lang, links) {



				//change language of labels
				angular.element(document).ready(function () {
					var leafletLabels = document.getElementsByClassName("leaflet-label");
					for (var i = 0; i < leafletLabels.length; i++){
						//Defining parameters of map
						leafletLabels.item(i).style.fontSize = nationalities_config.fontSize;
						leafletLabels.item(i).style.fontFamily = nationalities_config.fontFamily;

						if(localStorage.getItem('language') == 'ru'){
							var translations = lang.langs[localStorage.getItem('language')];
							for(var item in translations.labels) if(translations.labels.hasOwnProperty(item)){
								if(leafletLabels.item(i).innerHTML == item){
									leafletLabels.item(i).innerHTML = translations.labels[item];
								}
							}

							// Change language of menu
							var map = document.getElementById("countries_item");
							var desc = document.getElementById("countries_desc");

							var menu = lang.langs.ru.menu;

							map.innerHTML = menu["Countries"];
							desc.innerHTML = menu["Countries map"];

							var mapNames = lang.langs.ru.mapNames;

						}
					}
				});


					// //Change language of map name
					// var mapName = document.getElementById("map_name");
					// mapName.innerHTML = mapNames["Nationalities"];


		angular.extend($scope, {
			markers: attrService.mountainPeaks,
			overlays: {
				NorthAmerica: {
					name: "North America",
					type: "markercluster",
					visible: true
				},
				eastafrica: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				tibet: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				wasia: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				SouthAmerica: {
					name: "North America",
					type: "markercluster",
					visible: true
				},
				Eurasia: {
					name: "North America",
					type: "markercluster",
					visible: true
				}
			}
		}
	);

		leafletData.getMap("nationalities").then(function(map) {
			//Add zoom button to the map
			L.control.zoom().addTo(map);
		});

		var jsonVars = nationalities;
		for(var i = 0; i < jsonVars.length; i++){
			for (var name in jsonVars[i]) if(jsonVars[i].hasOwnProperty(name)){

				var layer = geojsonvt(jsonVars[i][name]);
					// simplification tolerance (higher means simpler)
		    		// you need set it to 30-40 at least to feel the difference
		    		layer.options.tolerance = nationalities_config.tolerance; 
		    		//Define max zoom to each level. After this zoom layers won't display
		    		layer.options.maxZoom = nationalities_config.layerMaxZoom;
				CenterMap(layer, "LayerPoly" + name, "nationalities", leafletData);
			}
		}

      }])

	.controller('countriesCtrl', ['$scope', 'leafletData', 'attrService', '$rootScope', 'lang', 'links',
	function($scope, leafletData, attrService, $rootScope, lang, links){
			
		angular.extend($scope, {
			markers: attrService.mountainPeaks,
			overlays: {
				NorthAmerica: {
					name: "North America",
					type: "markercluster",
					visible: true
				},
				eastafrica: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				tibet: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				wasia: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				SouthAmerica: {
					name: "North America",
					type: "markercluster",
					visible: true
				},
				Eurasia: {
					name: "North America",
					type: "markercluster",
					visible: true
				}
			}
		});

			if(localStorage.getItem('language') == 'ru'){
				var translations = lang.langs.ru;

				//change language of labels
				angular.element(document).ready(function () {

					var leafletLabels = document.getElementsByClassName("leaflet-label");
					for (var i = 0; i < leafletLabels.length; i++){
						
						for(var item in translations.labels) if(translations.labels.hasOwnProperty(item)){
							if(leafletLabels.item(i).innerHTML == item){
								leafletLabels.item(i).innerHTML = translations.labels[item];
							}
							//Defining parameters of map
							leafletLabels.item(i).style.fontSize = countries_config.fontSize;
							leafletLabels.item(i).style.fontFamily = countries_config.fontFamily;
						}

					}

					//Change language of map name
					var mapName = document.getElementById("map_name");
					mapName.innerHTML = translations.mapNames[mapName.innerHTML];

					//Change language of menu
					var map = document.getElementById("countries_item");
					var desc = document.getElementById("countries_desc");

					var menu = lang.langs.ru.menu;

					map.innerHTML = menu["Countries"];
					desc.innerHTML = menu["Countries map"];

					//Change language of map name
					var mapName = document.getElementById("map_name");
					mapName.innerHTML = menu["Countries"];
				});

			}


			leafletData.getMap("countries").then(function(map) {

				//Add zoom button to the map
				L.control.zoom().addTo(map);

				//Zoom level
				map.options.maxZoom=10;
				map.options.minZoom=2;

				//Creating a control to display feature parameters
				info = L.control();

				info.onAdd = function (map) {
					this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
					this.update();
					return this._div;
				};

				// method that we will use to update the control based on feature properties passed
				info.update = function (props) {
					this._div.innerHTML = '<h4>Country state</h4>' +  (props ?
						'<b>' + props.CNTRY_NAME + '</b><br />' + props.world_bo_1 : 'Define country');
				};

				info.addTo(map);

				var countries = attrService.attrs.LayerPoly_countries;

				function style(feature) {
					return {
						fillColor: countries.fillColor,
						fillOpacity: countries.fillOpacity,
						weight: countries.weight,
						color: countries_config.color
					};
				}

				//Add an underlying layer
				geojson =  L.geoJson(_countries, {
					style: style,
					//set simplification by smoothFactor
					smoothFactor: countries_config.smoothFactor,
					//Assigning actions to whether all features or certain one
					onEachFeature: function (feature, layer) {
						layer.bindPopup(feature.properties.CNTRY_NAME);
						//Not working properly
					    // var label = L.marker(layer.getBounds().getCenter(), {
					    //   icon: L.divIcon({
					    //     className: 'label',
					    //     html: feature.properties.CNTRY_NAME,
					    //     iconSize: [100, 40]
					    //   })
					    // }).addTo(map);
						layer.on({
							mouseover: highlightFeature,
							mouseout: resetHighlight
						});
					}
				}).addTo(map);

				//Add some labels of cities
				L.geoJson(_cities, {
					onEachFeature: function (feature, layer) {
						layer.bindPopup(feature.properties.Name);
						//Define your condition in which icons will be customized
						if(feature){
							var chelyabinskAsteroid = L.icon(attrService.icons.asteroid);
							L.marker([60.505, 80.57], {icon: chelyabinskAsteroid}).addTo(map);
						}
					}
				}).addTo(map);

		});

		function highlightFeature(e){
			var layer = e.target;

			layer.setStyle({
				color: '#666',
				dashArray: '',
				fillOpacity: 0.9
			});

			if (!L.Browser.ie && !L.Browser.opera) {
				layer.bringToFront();
			}

			info.update(layer.feature.properties);
		}

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}
		
	}]);



function CenterMap(rawData, layerName, mapid, leafletData	) {
	var _layer;
	_layer = getGeojsonVectorTiles(rawData, layerName);
	leafletData.getMap(mapid).then(function(map) {
		//Zoom level
		map.options.maxZoom = 10;
		map.options.minZoom = 2;
		_layer.addTo(map);
	});
}

function getGeojsonVectorTiles (rawData, layerName) {
	return  L.canvasTiles()
		//.params({ debug: false, padding: 5 , layer: rawData, LayerName: layerName, attributes: attrService.attrs[layerName] })
		.params({ debug: false, padding: 5 , layer: rawData, LayerName: layerName, attributes: null })
		.drawing(drawingOnCanvas);
}

function drawingOnCanvas(canvasOverlay, params) {
    var pad = 0;
	params.tilePoint.z = params.zoom;
	var _canvas = params.canvas;
	var ctx = params.canvas.getContext('2d');
	ctx.globalCompositeOperation = 'source-over';

    var zParam = params.tilePoint.z
    var xParam = params.tilePoint.x

    if (zParam == 2){
        if (xParam < 0 || xParam > 3 ){
            return;
        }
    }
    if (zParam == 3){
        if ( xParam < 0 || xParam > 7 ){
            return;
        }
    }

    if (zParam == 4){
        if (xParam < 0 || xParam > 15 ){
            return;
        }
    }

    if (zParam == 5){
        if ( xParam < 0 || xParam > 31 ){
            return;
        }
    }

	if ('devicePixelRatio' in window) {
	  if (window.devicePixelRatio > 1) {
		  _canvas.style.width = _canvas.width + 'px';
		  _canvas.style.height = _canvas.height + 'px';
		  _canvas.width *=2;
		  _canvas.height *=2;
		  ctx.scale(2,2);
	  }
  }
	var tile = params.layer.getTile(zParam, xParam, params.tilePoint.y);

    if (!tile) {
        return;
	}


    ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
			ctx.strokeStyle = '#b9b991';
			ctx.lineWidth = 0.5;


			var features = tile.features;

			for (var i = 0; i < features.length; i++) {
				var feature = features[i];

				type = feature.type;

				ctx.beginPath();

				for (var j = 0; j < feature.geometry.length; j++) {
					//window.alert(feature.tags.FIPS_CNTRY)
					ctx.fillStyle = feature.tags.color ? feature.tags.color : 'rgba( 12,155,155,0.5)' ; // params.options.attributes.color

					var geom = feature.geometry[j];
					// if (type === 1) {
					// 		ctx.arc(geom[0] * ratio + pad, geom[1] * ratio + pad, 2, 0, 2 * Math.PI, false);
					// 		continue;
					// }
					for (var k = 0; k < geom.length; k++) {
							var p = geom[k];
							var extent = 4096;
							var x = p[0] / extent * 256;
							var y = p[1] / extent * 256;
							if (k) ctx.lineTo(x  + pad, y   + pad);
							else ctx.moveTo(x  + pad, y  + pad);
					}
				}
				if (type === 3 || type === 1) ctx.fill('evenodd');
				ctx.stroke();
			}
	}

	var creator = function linkCreator(mapName, $scope, $compile){
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

        // $compile(angular.element(mapElem))($scope);
        // $compile(angular.element(configElem))($scope);

	};

