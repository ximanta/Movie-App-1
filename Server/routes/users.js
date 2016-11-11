var express = require('express');
var router = express.Router();
var User = require('../models/users')
/* GET users listing.*/

router.route('/add')
.post(function(req,res){
  if(req.body)
    {
      var userVar = new User(req.body);
      User.findOne({username:req.body.username},function(err,data){
        if(err){
        res.send("Some error Occured");
      }
        else if(data){
          res.send("User previously there")
        }
        else{
          userVar.save(function(err){
            if(err)
            {
              res.send(err);
            }
            else {
              res.send("User Inserted");
            }
          });
        }
      });
    }
    else{
      res.send("No data received");
    }
});
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/msg/:xyz', function(req, res, next) {
  res.send('Hello '+req.params.xyz);
});
router.post('/fname', function(req, res, next) {
  res.send('Hello '+req.query.fn+" "+req.query.ln);
});*/
module.exports = router;
