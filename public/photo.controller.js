var app = angular.module("photo");

app.controller('photoController', photo);

app.directive("photo", photoDirective);

function photoDirective(){
  return {
    templateUrl: "home/photo.controller.html"
  }
}

app.$inject = ['$http'];

function photo($http){
  vm = this;
  var getPhotos = $http.get("http://localhost:1337/load/Disneyland/1980");
  getPhotos.then(function(getPhotos){
    vm.list = getPhotos.data;
  })
}
