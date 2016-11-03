var React = require('react');
var But = require('./But');
var MovieBox = React.createClass({
  addMovieToDB:function(){
        $.ajax({
        url:'http://localhost:8080/movie/add',
        type:'POST',
        data:this.props.dataM,
        success:function(data){
          alert(data);
        }.bind(this),
        error:function(err){
          console.log(err);
        }.bind(this)
      });
  },
  render:function(){
    var linkIMDB = "http://www.imdb.com/title/"+this.props.dataM.imdbID;
    return (
      <div className="container-fluid">
      <div className="row">
      <div className="col-md-2">
      <img src={this.props.dataM.Poster} alt={this.props.dataM.Title} width="200px" />
      </div>
      <div className="col-md-10">
      <h1>{this.props.dataM.Title}</h1>
        <p>IMDB Id : {this.props.dataM.imdbID}<br/>Year : {this.props.dataM.Year}</p>
        <div className="row">
        <div className="col-md-2">
        <But class="btn btn-primary" clickHandler={this.addMovieToDB} btnText="Add"/>
        </div>
        <div className="col-md-2">
        <a href={linkIMDB} target="_blank">
        <But class="btn btn-success" btnText="View on IMDB"/>
        </a>
        </div>
        </div>
      </div>
      </div>
      <br />
      </div>

    )
  }
});
module.exports = MovieBox;
