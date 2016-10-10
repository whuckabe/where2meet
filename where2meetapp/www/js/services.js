'use strict';

angular.module('where2meet.services', ['ngResource'])
        .constant("baseURL","http://localhost:3000/")
        // Used for the Event collection
        .service('eventFactory', ['$resource', 'baseURL', function($resource,baseURL) {
                this.getEvents = function(){
                    return $resource(baseURL+"events/:id",null,  {'update':{method:'PUT' }}); 
                };

                this.deleteFromEvents = function(index){
                    console.log(index);
                };     
        }])
        .factory('$localStorage', ['$window', function($window) {
            return {
                store: function(key, value) {
                    console.log("Services Key: " + value);
                    $window.localStorage[key] = value;
                },
                get: function(key, defaultValue) {
                    return $window.localStorage[key] || defaultValue;
                },
                storeObject: function(key, value) {
                    console.log("Services Object: " + value);
                    $window.localStorage[key] = JSON.stringify(value);
                },
                getObject: function(key,defaultValue) {
                    return JSON.parse($window.localStorage[key] || defaultValue);
                }
            }
        }]);