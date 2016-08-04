var app = angular.module("photo");

app.controller('photoController', photo);

app.$inject = ['$http','$swipe'];

function photo($http){
  vm = this;
  var hover;
  var search = {where: 2427665, when: 1970};
  var locationsArray = [];
  vm.otherResults = false;

  vm.where = function(whereInput){
    var getLocation = $http.get("/where/" + whereInput);
    getLocation.then(function(getLocation){
      vm.locationsArray = getLocation.data;
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
    vm.currentPicture = getPictureUrl(vm.list[adjPos(vm.whereInArray)]);
    vm.title = vm.list[adjPos(vm.whereInArray)].title;
    for(var i = 0; i <= 20; i++){
      prefetchImage(getPictureUrl(vm.list[adjPos(vm.whereInArray - 10 + i)]));
    }
  }

  vm.explore = function(){
      var getExplore = $http.get("/explore");
      getExplore.then(function(getExplore){
        var exploreArray = getExplore.data;
        var randomIndex = Math.floor(Math.random()*(exploreArray.length-1-0+1)+0);
        vm.when(exploreArray[randomIndex].when);
        vm.where(exploreArray[randomIndex].where);
      })
  }

  function getPhotoArray(whenWhere, yearRange){
    var getPhotos = $http.get("/load/"+ whenWhere.where + "/" + whenWhere.when + "/" + yearRange);
    getPhotos.then(function(getPhotos){
      if(getPhotos.data.photos.total < 50 && yearRange < 10){
        getPhotoArray(whenWhere, yearRange+2);
      }
      else{
        vm.list = getPhotos.data.photos.photo;
      }
    })
  }
}

function prefetchImage(source){
  var myImage = new Image();
  myImage.src = source;
}

function adjPos(oldIndex){
  if(oldIndex < 0){
    oldIndex = vm.list.length + oldIndex;
  }
  if(oldIndex > vm.list.length-1){
    oldIndex = oldIndex - vm.list.length;
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
