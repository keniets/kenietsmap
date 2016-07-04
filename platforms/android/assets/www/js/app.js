// Ionic Starter App

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MapAble', ['ionic', 'angularMoment', 'leaflet-directive', 'MapAble.controllers', 'MapAble.directives',
  'MapAble.filters', 'MapAble.services', 'MapAble.factories', 'MapAble.config', 'underscore', 'ngResource', 'ngCordova',
  'templates', 'slugifier', 'dataStorage', 'geoJsonVars', 'translate'])

.run(function($ionicPlatform, PushNotificationsService) {

  $ionicPlatform.on("deviceready", function(){
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    PushNotificationsService.register();
  });

  $ionicPlatform.on("resume", function(){
    PushNotificationsService.register();
  });
})


.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
 function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
  $stateProvider


  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "side-menu.html",
    controller: 'AppCtrl'
  })

  //LAYOUTS
  .state('app.zones', {
    url: "/main",
    views: {
      'menuContent': {
        templateUrl: "zones.html",
        controller: 'zonesCtrl'
      }
    }
  })

  //LAYOUTS
  .state('app.population', {
    url: "/layouts",
    views: {
      'menuContent': {
        templateUrl: "layouts.html"
      }
    }
  })


  .state('app.nationalities', {
    url: "/layouts/nationalities",
    views: {
      'menuContent': {
        templateUrl: "nationalities.html",
        controller: 'nationalitiesCtrl'
      }
    }
  })

.state('app.countries', {
    url: "/layouts/countries",
    views: {
      'menuContent': {
        templateUrl: "countries.html",
        controller: "countriesCtrl"
      }
    }
  })

  //FEEDS
  .state('app.feeds-categories', {
    url: "/feeds-categories",
    views: {
      'menuContent': {
        templateUrl: "feeds-categories.html",
        controller: 'FeedsCategoriesCtrl'
      }
    }
  })

  .state('app.category-feeds', {
    url: "/category-feeds/:categoryId",
    views: {
      'menuContent': {
        templateUrl: "category-feeds.html",
        controller: 'CategoryFeedsCtrl'
      }
    }
  })

  .state('app.feed-entries', {
    url: "/feed-entries/:categoryId/:sourceId",
    views: {
      'menuContent': {
        templateUrl: "feed-entries.html",
        controller: 'FeedEntriesCtrl'
      }
    }
  })


  //WORDPRESS
  .state('app.wordpress', {
    url: "/wordpress",
    views: {
      'menuContent': {
        templateUrl: "wordpress.html",
        controller: 'WordpressCtrl'
      }
    }
  })

  .state('app.post', {
    url: "/wordpress/:postId",
    views: {
      'menuContent': {
        templateUrl: "wordpress_post.html",
        controller: 'WordpressPostCtrl'
      }
    }
  })


  //OTHERS
  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "settings.html",
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.forms', {
    url: "/forms",
    views: {
      'menuContent': {
        templateUrl: "forms.html",
        controller: 'FormsCtrl'
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "profile.html",
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('app.bookmarks', {
    url: "/bookmarks",
    views: {
      'menuContent': {
        templateUrl: "bookmarks.html",
        controller: 'BookMarksCtrl'
      }
    }
  })

;

// $translateProvider
//     .translations('en', translations)
//     .preferredLanguage('en');

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
}]);


