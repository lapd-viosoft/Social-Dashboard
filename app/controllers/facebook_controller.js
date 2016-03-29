socialDashboard.controller('FacebookController', [ '$scope','ENV', function($scope, ENV) {
  OAuth.initialize(ENV.oauthKey);

  $scope.facebookAuth = function() {
    OAuth.popup('facebook')
    .done(function(result) {
      $scope.alertMessage = 'Facebook authentication successful!'
      $scope.$apply();
    })
    .fail(function (err) {
      $scope.alertMessage = 'Facebook authentication unsuccessful!'
    });
  }

  $scope.postStatus = function(post) {
    OAuth.popup('facebook')
    .done(function(result) {
      result.post('/me/feed', {
        data: {
          message: post
        }
      })
      .done(function (response) {
        $scope.getPosts()
      })
      .fail(function (err) {
        console.log(err)
      });
    })
    .fail(function (err) {
      console.log(err)
    })
  }

  $scope.getPosts = function() {
    OAuth.popup('facebook', {cache: true})
    .done(function(result) {
      console.log(result.access_token)
      result.get('/me/feed')
      .done(function (response) {
        console.log(response.data)
        $scope.posts = response.data;
        $scope.$apply();
      })
      .fail(function (err) {
        console.log(err)
      })
      $scope.alertMessage = 'Facebook authentication successful!'
    })
    .fail(function (err) {
      $scope.alertMessage = 'Facebook authentication unsuccessful!'
    });
  }

}]);