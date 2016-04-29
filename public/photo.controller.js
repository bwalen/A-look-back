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
  var hover;
  var search = {where: 2427665, when: 1970};
  var locationsArray = [];
  getPhotoArray(search, 1);

  vm.where = function(whereInput){
    var getLocation = $http.get("http://localhost:1337/where/" + whereInput);
    getLocation.then(function(getLocation){
      locationsArray = getLocation.data;
      search.where = getLocation.data.places.place[0].woeid;
      getPhotoArray(search, 1);
    })
  }

  vm.when = function(whenInput){
    search.when = whenInput;
  }

  vm.show = function(index){
    vm.whereInArray = index;
    if(vm.whereInArray < 0){
      vm.whereInArray = vm.list.length-1;
    }
    if(vm.whereInArray > vm.list.length-1){
      vm.whereInArray = 0;
    }
    vm.currentPicture = getPictureUrl(vm.list[vm.whereInArray]);
    vm.nextPicture = getPictureUrl(vm.list[vm.whereInArray+1]);
    vm.previousPicture = getPictureUrl(vm.list[vm.whereInArray-1]);
    vm.nextNextPicture = getPictureUrl(vm.list[vm.whereInArray+2]);
    vm.prePrePicture = getPictureUrl(vm.list[vm.whereInArray-2]);
  }

  function getPhotoArray(whenWhere, yearRange){
    var getPhotos = $http.get("http://localhost:1337/load/"+ whenWhere.where + "/" + whenWhere.when + "/" + yearRange);
    getPhotos.then(function(getPhotos){
      if(getPhotos.data.photos.total < 100 && yearRange <= 5){
        getPhotoArray(whenWhere, yearRange+1);
      }
      else{
      vm.list = getPhotos.data.photos.photo;
      }
    })
  }
}

function getPictureUrl(picture){
  if(picture.url_l){
    return picture.url_l;
  }
  else if(picture.url_b){
    return picture.url_b;
  }
  else if(picture.url_h){
    return picture.url_h;
  }
  else if(picture.url_k){
    return picture.url_k;
  }
  else if(picture.url_o){
    return picture.url_o;
  }
  else if(picture.url_c){
    return picture.url_c;
  }
  else if(picture.url_z){
    return picture.url_z;
  }
  else if(picture.url_m){
    return picture.url_m;
  }
  else{
    return picture.url_n;
  }
}
