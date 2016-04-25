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
  var getPhotos = $http.get("http://localhost:1337/load/Disneyland/1970");
  getPhotos.then(function(getPhotos){
    console.log(getPhotos.data);
    vm.list = getPhotos.data;
  })
}
