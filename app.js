var express = require("express");
var bodyParser= require("body-parser");
var app = express();
var request = require("request");
var mongo = require('mongodb');
var myClient = mongo.MongoClient;
var url = "mongodb://bwalen:alookback@ds013162.mlab.com:13162/bwalen";
var port = process.env.PORT || 1337;

app.use(bodyParser.json());
app.use(express.static("./public"));

app.get("/load/:location/:year/:range", function(req, res){
  beginningYear = req.params.year - req.params.range;
  endingYear = Number(req.params.year) + Number(req.params.range);
  request("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=08ebd1a2af52b3e1e52749c9021ffe04&min_taken_date=" + beginningYear + "-01&max_taken_date=" + endingYear + "-01&woe_id=" + req.params.location + "&sort=interestingness-desc&safe_search=1&extras=date_taken,url_sq,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o,geo,tags&format=json&nojsoncallback=1&per_page=100", function(error, response, body){
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

app.get("/explore", function(req, res){
  myClient.connect(url, function(error, database){
    if(!error){
      var alookback = database.collection("alookback");
      alookback.find({}).toArray(function(err, docs){
        res.send(docs);
        database.close();
      });
    }
  })
})

app.listen(port, function(){
  console.log("Listening on port " + port);
});
