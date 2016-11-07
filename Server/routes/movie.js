var express = require('express');
var router = express.Router();
var Movie = require('../models/movie')

router.route("/add")
.post(function(req,res){
  if(req.body)
  {
    var obj = {'imdbID':req.body.imdbID};
    req.body["Comment"]="No Comments yet, Be the first one to Comment";
    var movieVar = new Movie(req.body);
    Movie.findOne(obj,function(err,data){
      if(data){
          res.send("Movie already exist");
      }
    else{
      movieVar.save(function(err){
        if(err)
        {
          res.send(err);
        }
        else {
          res.send("Movie Added as Favorite");
        }
      });
    }
    });
  }
});

router.route("/get")
.get(function(req,res) {
  if(Object.keys(req.query).length>0)
  {
    var obj = {};
    for (var i = 0; i < Object.keys(req.query).length; i++) {
        obj[Object.keys(req.query)[i]]=req.query[Object.keys(req.query)[i]];
    }

    Movie.findOne(obj,function(err,data){
      res.send(data);
    });
  }
  else {
    Movie.find(function(err, data){
        res.json(data);
    });
  }
});

router.route("/delete")
.delete(function(req,res) {
  if(req.query)
  {
    var obj = {};
    obj[Object.keys(req.query)[0]]=req.query[Object.keys(req.query)[0]];
    Movie.remove(obj,function(err,data){
      data = data[Object.keys(data)[0]];//  result: { ok: 1, n: 1 },
      data = data[Object.keys(data)[1]];// value of n(number of rows)

      if(data!=0)
      {
        data = "data deleted succesfully \nNumber of row deleted = "+data;
      }
      else {
        data = "data deletion unsuccessfull due to unavailability of data";
      }
      res.send(data);
    });
  }
});

router.route("/update")
.put(function(req,res){
  var obj = req.body;
  if(Object.keys(obj).length>0)
  {
    var b = {'imdbID':obj['imdbID']};
    obj = {"$set":obj};
    Movie.update(b,obj,function(err,data){
      res.send("data updated with \n"+JSON.stringify(data));
    });
  }
});

module.exports = router;
