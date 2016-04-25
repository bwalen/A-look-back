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

app.get("/load/:location/:year", function(req, res){
  request("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=08ebd1a2af52b3e1e52749c9021ffe04&max_taken_date="+ getUnixDate(req.params.year) + "+&text=Disneyland&format=json&nojsoncallback=1&per_page=30", function(error, response, body){
    res.json(body);
  })
})

app.get("/date/:year", function(req, res){
  request("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=08ebd1a2af52b3e1e52749c9021ffe04&max_taken_date="+ getUnixDate(req.params.year) + "+&format=json&nojsoncallback=1&per_page=30", function(error, response, body){
    res.json(body);
  })
})

app.get("/where/:location", function(req, res){
  
})

app.listen(port, function(){
  console.log("Listening on port " + port);
});

function getUnixDate(year){
  return((year-1970)*31536000000);
}
