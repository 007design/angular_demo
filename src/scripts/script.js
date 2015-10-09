var app = angular.module('demoModule', ['ngAnimate']);

app.directive('codeFormat', function(){
  return {
    restrict: 'C',
    compile: function(tElem){
      tElem.find('code').html(tElem.find('code').html().replace(/</g, "&lt;").replace(/>/g, "&gt;"))
      return function($scope, elem){
        hljs.highlightBlock(elem[0])
      }
    }
  };
});

app.controller('filterCtrl', function($scope){
  $scope.array = ['cat one', 'cat two', 'cat three', 'dog one', 'dog two', 'dog three'];
});

app.filter('reverse', function() {
  return function(input, uppercase) {
    if (!input) return '';
    var out = "";
    for (var i = 0; i < input.length; i++) {
      out = input.charAt(i) + out;
    }
    return out;
  }
});

app.controller('repeatCtrl', function($scope){
  $scope.array = ['value one', 'value two', 'value three'];
});

app.controller('includeCtrl', function($scope){
  $scope.template = 'inlineTemplate.html';
  
  $scope.toggleTemplate = function(){
    $scope.template = $scope.template == 'inlineTemplate.html' ? 'externalTemplate.html' : 'inlineTemplate.html';
  };
});

app.controller('httpCtrl', function($scope, $http, $timeout){
    $scope.array = [];
    
    function getData(url){
      return $http.get(url);
    }
    
    $scope.loadData = function(){
      $scope.loading = true;
      
      $timeout(function(){
        getData('data.json').then(function(resp){
          $scope.array = $scope.array.concat(resp.data);
          
          $timeout(function(){
            getData('data2.json').then(function(resp){
              $scope.array = $scope.array.concat(resp.data);
              $scope.loading = false;
            });
          }, 2000);
          
        });
      }, 2000);
    
    };
  });