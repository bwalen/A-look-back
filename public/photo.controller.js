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
  var search = {where: 2427665, when: 1990-01};
  var locationsArray = [];
  getPhotoArray(search);

  vm.where = function(whereInput){
    var getLocation = $http.get("http://localhost:1337/where/" + whereInput);
    getLocation.then(function(getLocation){
      locationsArray = getLocation.data;
      search.where = getLocation.data.places.place[0].woeid;
      console.log(getLocation.data.places);
      getPhotoArray(search);
    })
  }

  vm.when = function(whenInput){
    search.when = whenInput;
  }

  function getPhotoArray(whenWhere){
    console.log(whenWhere);
    var getPhotos = $http.get("http://localhost:1337/load/"+whenWhere.where + "/" + whenWhere.when);
    getPhotos.then(function(getPhotos){
      console.log(getPhotos.data);
      vm.list = getPhotos.data.photos.photo;
    })
  }
}
