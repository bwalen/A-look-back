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
  vm.otherResults = false;
  //getPhotoArray(search, 1);

  vm.where = function(whereInput){
    var getLocation = $http.get("http://localhost:1337/where/" + whereInput);
    getLocation.then(function(getLocation){
      console.log(getLocation.data);
      vm.locationsArray = getLocation.data;
      console.log(vm.locationsArray);
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
    vm.nextNextPicture = getPictureUrl(vm.list[adjPos(vm.whereInArray+2)]);
    vm.nextPicture = getPictureUrl(vm.list[adjPos(vm.whereInArray+1)]);
    vm.previousPicture = getPictureUrl(vm.list[adjPos(vm.whereInArray-1)]);
    vm.prePrePicture = getPictureUrl(vm.list[adjPos(vm.whereInArray-2)]);
    vm.currentPicture = getPictureUrl(vm.list[adjPos(vm.whereInArray)]);
  }

  function getPhotoArray(whenWhere, yearRange){
    var getPhotos = $http.get("http://localhost:1337/load/"+ whenWhere.where + "/" + whenWhere.when + "/" + yearRange);
    getPhotos.then(function(getPhotos){
      if(getPhotos.data.photos.total < 50 && yearRange <= 10){
        getPhotoArray(whenWhere, yearRange+2);
      }
      else{
      vm.list = getPhotos.data.photos.photo;
      }
    })
  }
}

function adjPos(oldIndex){
  if(oldIndex < 0){
    oldIndex = vm.list.length-1;
  }
  if(oldIndex > vm.list.length-1){
    oldIndex = 0;
  }
  return oldIndex;
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
