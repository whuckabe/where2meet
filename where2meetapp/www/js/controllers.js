angular.module('where2meet.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = $localStorage.getObject('userinfo','{}');
  $scope.reservation = {};
  $scope.comment = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $localStorage.storeObject('userinfo',$scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  // Create the reserve modal that we will use later
  $ionicModal.fromTemplateUrl('templates/createEvent.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.createform = modal;
  });

  // Triggered in the reserve modal to close it
  $scope.closeCreateEvent = function() {
    $scope.createform.hide();
  };

  // Open the reserve modal
  $scope.createEvent = function() {
    $scope.createform.show();
  };

  // Perform the reserve action when the user submits the reserve form
  $scope.doCreateEvent = function() {
    console.log('Create Event', $scope.event);

    // Simulate a reservation delay. Remove this and replace with your reservation
    // code if using a server system
    $timeout(function() {
      $scope.closeCreateEvent();
    }, 1000);
  };

  // Create the Update Event modal that we will use later
  $ionicModal.fromTemplateUrl('templates/updateEvent.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.updateform = modal;
  });

  // Triggered in the update modal to close it
  $scope.closeUpdate = function() {
    $scope.updateform.hide();
  };

  // Open the update modal
  $scope.updateEvent = function() {
    $scope.updateform.show();
  };

  // Perform the update action when the user submits the update form
  $scope.doUpdate = function() {
    console.log('Updating Event', $scope.update);

    // Simulate a delay. Remove this and replace with your Update Event
    // code if using a server system
    $timeout(function() {
      $scope.closeUpdate();
    }, 1000);
  };

  // Create the comment modal that we will use later
  $ionicModal.fromTemplateUrl('templates/createComment.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.commentform = modal;
  });

  // Triggered in the comment modal to close it
  $scope.closeComment = function() {
    $scope.commentform.hide();
  };

  // Open the comment modal
  $scope.comment = function() {
    $scope.commentform.show();
  };

  // Perform the comment action when the user submits the comment form
  $scope.doComment = function(id) {
    console.log('Doing comment', $scope.comment);
    console.log('Event ID: ', id);

    // Simulate a comment delay. Remove this and replace with your comment
    // code if using a server system
    $timeout(function() {
      $scope.closeComment();
    }, 1000);
  };
})

.controller('MenuController', ['$scope', 'menuFactory', 'baseURL', function($scope, menuFactory, baseURL) {
            
            $scope.baseURL = baseURL;
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

      .controller('EventController', ['$scope', 'eventFactory', '$localStorage', 'baseURL', function($scope, eventFactory, $localStorage, baseURL) {
            
            $scope.baseURL = baseURL;
            $scope.shouldShowDelete = false;
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            loginData = $localStorage.getObject('userinfo','{}')
            username = loginData.username;
            console.log("UserName: " + username);
            
            eventFactory.getEvents().query(
                function(response) {
                    $scope.events = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });

                    
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = username;
                }
                else if (setTab === 3) {
                    $scope.filtText = "jsmith@acme.com";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };

            $scope.toggleDelete = function () {
                $scope.shouldShowDelete = !$scope.shouldShowDelete;
                console.log($scope.shouldShowDelete);
            }

            $scope.deleteEvent = function (index) {
                eventFactory.deleteFromEvents(index);
                $scope.shouldShowDelete = false;
            }
        }])
      .controller('EventDetailController', ['$scope', '$stateParams', 'eventFactory', '$localStorage', 'baseURL', function($scope, $stateParams, eventFactory, $localStorage, baseURL) {
            
            $scope.baseURL = baseURL;
            $scope.event = {};
            $scope.showEvent = false;
            $scope.hideRSVP = false;
            $scope.message="Loading ...";
            loginData = $localStorage.getObject('userinfo','{}')
            username = loginData.username;
            
            $scope.event = eventFactory.getEvents().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.event = response;
                                $scope.showEvent = true;
                                if($scope.event.owner == username)
                                {
                                  $scope.hideRSVP = true;
                                }
                                else
                                {
                                  $scope.hideRSVP = false;
                                }
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );            
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', 'baseURL', function($scope, $stateParams, menuFactory, baseURL) {
            
            $scope.baseURL = baseURL;
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );

            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
        menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and About Controller here

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', 'eventFactory', 'baseURL', function($scope, menuFactory, corporateFactory, eventFactory, baseURL) {
                                        
                        $scope.baseURL = baseURL;
                        $scope.leader = corporateFactory.get({id:3});
                        $scope.showDish = false;
                        $scope.message="Loading ...";
                        $scope.event = eventFactory.getEvents().get({id:0});
                        $scope.dish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
                        $scope.promotion = menuFactory.getPromotion().get({id:0});
            
                    }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            
                    $scope.leaders = corporateFactory.query();
                    console.log($scope.leaders);
            
                    }]);

/*
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
*/
