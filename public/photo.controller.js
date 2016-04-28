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
    picture=vm.list[index];
    console.log(picture);
    if(picture.url_b){
      vm.currentPicture = picture.url_b;
    }
    else if(picture.url_h){
      vm.currentPicture = picture.url_h;
    }
    else if(picture.url_k){
      vm.currentPicture = picture.url_k;
    }
    else if(picture.url_o){
      vm.currentPicture = picture.url_o;
    }
    else if(picture.url_c){
      vm.currentPicture = picture.url_c;
    }
    else if(picture.url_z){
      vm.currentPicture = picture.url_z;
    }
    else{
      vm.currentPicture = picture.url_n;
    }
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
