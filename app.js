var express = require("express");
var bodyParser= require("body-parser");
var mongo = require('mongodb');
var app = express();
var request = require("request");
var myClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/test";
var port = process.env.PORT || 1337;

app.use(bodyParser.json());
app.use(express.static("./public"));

app.get("/load/:location/:year/:range", function(req, res){
  beginningYear = req.params.year - req.params.range;
  endingYear = Number(req.params.year) + Number(req.params.range);
  console.log(beginningYear +" "+endingYear)
  request("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=08ebd1a2af52b3e1e52749c9021ffe04&min_taken_date=" + beginningYear + "-01&max_taken_date=" + endingYear + "-01&woe_id=" + req.params.location + "&sort=interestingness-desc&safe_search=1&extras=date_taken,url_l,url_n,url_o,geo,tags&format=json&nojsoncallback=1&per_page=100", function(error, response, body){
    res.send(body);
  })
})

app.get("/date/:year", function(req, res){
  request("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=08ebd1a2af52b3e1e52749c9021ffe04&max_taken_date="+ getUnixDate(req.params.year) + "+&format=json&nojsoncallback=1&per_page=30", function(error, response, body){
    res.send(body);
  })
})

app.get("/where/:location", function(req, res){
  request("https://api.flickr.com/services/rest/?method=flickr.places.find&api_key=08ebd1a2af52b3e1e52749c9021ffe04&&query=" + req.params.location + "&format=json&nojsoncallback=1&per_page=30", function(error, response, body){
    res.send(body);
  })
})

app.listen(port, function(){
  console.log("Listening on port " + port);
});
