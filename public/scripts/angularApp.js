var app = angular.module('myApp', []);
/*app.controller('myCtrl',['$scope','$http',
 function($scope) {
   $scope.submit= function(){
     alert("hey");
           
      };

     /* $http.post("/", "dd").success(function(data, status) {
        console.log('Data posted successfully');
      });*/
  /* 
}]);
app.controller('myCtrl', function($scope, $http) {
    $http.get("https://www.google.com")
    .then(function(response) {
        $scope.myWelcome = response.data;
    });
}); */

app.controller('myCtrl', function($scope, $http) {
    $scope.formdata={};
   
   $scope.submit = function() {
       
       console.log($scope.formdata);
        $http.post('/', $scope.formdata)
            .then(function(data) {
                $scope.formdata.num = ""; // clear the form so our user is ready to enter another
                $scope.words=[];
                
               // console.log(data);
                console.log(data["data"][0]);
                 $scope.words.push({"count":"Frequency","word":"Word"});
                for(var i=0;i<data["data"].length;i++)
                {
                    $scope.words.push(data["data"][i]);
                }
                console.log($scope.words);
            })
            .then(function(data) {
                console.log('Error: ' + data);
            });
    };

});