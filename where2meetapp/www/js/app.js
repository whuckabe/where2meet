// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('where2meet', ['ionic', 'where2meet.controllers','where2meet.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
        controller: 'IndexController'
      }
    }
  })
  .state('app.listEvent', {
      url: '/listEvent',
      views: {
        'mainContent': {
          templateUrl: 'templates/listEvent.html',
          controller: 'EventController'
        }
      }
    })
    .state('app.createEvent', {
      url: '/createEvent',
      views: {
        'mainContent': {
          templateUrl: 'templates/createEvent.html'
        }
      }
    })
    .state('app.contacts', {
      url: '/contacts',
      views: {
        'mainContent': {
          templateUrl: 'templates/contacts.html',
          controller: ''
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      views: {
        'mainContent': {
          templateUrl: 'templates/settings.html',
          controller: ''
        }
      }
    })
  .state('app.contactDetails', {
    url: '/contact/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/contactDetails.html',
        controller: ''
      }
    }
  })
  .state('app.eventDetails', {
    url: '/event/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/eventDetails.html',
        controller: 'EventDetailController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
