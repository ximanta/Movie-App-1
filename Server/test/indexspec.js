var should = require("chai").should(),
// expect = require("chai").expect,
// assert = require("chai").assert,
supertest = require("supertest"),
app = require("../bin/harsh");
var expect = require('chai').expect;
var sinon = require('sinon');
var model = require('../models/movie.js');
var modelStub = sinon.stub(model, 'find');
var modelStub1 = sinon.stub(model, 'findOne');
var modelStub2 = sinon.stub(model, 'insert');

var url = supertest("http://localhost:8080");
var data = {"Title":"Karz","Year":"1980","imdbID":"tt0214841","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BMTY5NTUyODI5NF5BMl5BanBnXkFtZTgwODMzOTk1MDE@._V1_SX300.jpg"};
var data2 = {"Title":"Karz Chukana Hai","Year":"1980","imdbID":"tt0214841","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BMTY5NTUyODI5NF5BMl5BanBnXkFtZTgwODMzOTk1MDE@._V1_SX300.jpg"};
var data1 = {"Title":"Sultan","Year":"2016","imdbID":"tt4832640","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BOWY3MmVmMGQtYTIyMS00ODc2LWI4N2YtMjA1MmY1YjA3MzVlXkEyXkFqcGdeQXVyMTkzOTcxOTg@._V1_SX300.jpg"};
var id = "tt0214841";
var id1 = "tt4832640";


describe('Test my controller', function(){
  describe('Find items', function(){
    beforeEach(function(){
      modelStub.yields(null, [{'itemid': 1, 'itemname': 'goods'}]);
    });
    it('should attempt to find items', function(done){
      url
        .get('/movie/get')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return done(err);
          //console.log(res.body);
          //Enter your assertions here
          expect(res.body[0].itemname).to.be.equal("goods");
          done();
        });
    });
  });
  describe('Find a item given the argument', function(){
      beforeEach(function(done){
        modelStub1.withArgs({'itemid':4}).yields(null, [{'itemid': 4, 'itemname': 'Goods 45'}]);
        modelStub1.withArgs({'itemid':5}).yields(null, [{'itemid': 5, 'itemname': 'Goods 55'}]);
        done();
      });

    it('should attempt to find items', function(done){
      url
        .get('/movie/get?Title=Sultan')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return done(err);
          // console.log(res.body);
          // Enter your assertions here
          expect(res.body[0].itemname).to.be.equal("Goods 45");

        });
        done();
    });
  });
});


describe.only('Test my controller', function(){
  describe('Add items', function(){
    beforeEach(function(){
      modelStub2.yields(null);
    });
    it('should attempt to find items', function(done){
      url
        .post('/movie/add')
        .expect(200)
        .send({name:"Harsh"})
        .end(function(err, res){
          if (err) return done(err);
          //console.log(res.body);
          //Enter your assertions here
          expect(res.body[0].itemname).to.be.equal("Movie Added as Favorite");
          done();
        });
    });
  });
});


describe("Testing the Post for Add Movie", function(err){
  it("should handle and send the JSON data", function(done){
    url
        .post("/movie/add")
        .expect(200)
        .send(data)
        .end(function(err,res){
          should.not.exist(err);
          res.text.should.be.equal("Movie Added as Favorite");
          done();
        });

  });
  it("should handle and send the JSON data1", function(done){
    url
        .post("/movie/add")
        .expect(200)
        .send(data1)
        .end(function(err,res){
          should.not.exist(err);
          res.text.should.be.equal("Movie Added as Favorite");
          done();
        });

  });
});

describe("Testing the get Movies", function(err){
  it("should handle the request", function(done){
    url
        .get("/movie/get?Title=Sultan")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res){
          if (err) {
				        throw err;
			    }
          //expect(res.text).to.be.equal("Hello!");
          var myObj = JSON.parse(res.text);
          myObj.Title.should.be.equal('Sultan');
          //assert(res.text == "Hello!","Test has failed");
          done();
        });
  });
});


describe("Testing the get Movies", function(err){
  it("should handle the request", function(done){
    url
        .get("/movie/get")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res){
          if (err) {
				        throw err;
			    }
          //expect(res.text).to.be.equal("Hello!");
          var myObj = JSON.parse(res.text);
          myObj.should.be.instanceOf(Array);
          //assert(res.text == "Hello!","Test has failed");
          done();
        });
  });
});



describe("Testing the Post for Add Movie", function(err){
  it("should handle and send the JSON data", function(done){
    url
        .post("/movie/add")
        .expect(200)
        .send(data)
        .end(function(err,res){
          should.not.exist(err);
          res.text.should.be.equal("Movie already exist");
          done();
        });

  });
});


describe("Testing the Put for Update", function(err){
  it("should handle and send the computed info", function(done){
    url
        .put("/movie/update")
        .expect(200)
        .send(data2)
        .end(function(err,res){
          should.not.exist(err);
          res.text.should.be.equal("data updated with succesfully");
          done();
        });

  });
});

describe("Testing the Delete for delete Movie", function(err){
  it("should handle delete for data1", function(done){
    url
        .delete("/movie/delete?imdbID="+id)
        .expect(200)
        .end(function(err,res){
          should.not.exist(err);
          res.text.should.be.equal("data deleted succesfully");
          done();
        });

  });
  it("should handle delete for data2", function(done){
    url
        .delete("/movie/delete?imdbID="+id1)
        .expect(200)
        .end(function(err,res){
          should.not.exist(err);
          res.text.should.be.equal("data deleted succesfully");
          done();
        });

  });
});
