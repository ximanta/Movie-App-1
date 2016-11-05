var React = require('react');
var FavMovieBox = React.createClass({
  deleteMovieFromDB:function(){
        $.ajax({
        url:'http://localhost:8080/movie/delete?imdbID='+this.props.dataM.imdbID,
        type:'DELETE',
        success:function(data){
          alert(data);
          (typeof this.props.refresh);
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
        <p>IMDB Id : {this.props.dataM.imdbID}<br/>Year : {this.props.dataM.Year}<br />Type : {this.props.dataM.Type}<br />Comment : {this.props.dataM.Comment}</p>
        <div className="row">
        <div className="col-md-2">
        <button className="btn btn-primary" >Update</button>
        </div>
        <div className="col-md-2">
        <button className="btn btn-success" onClick={this.deleteMovieFromDB}>Delete</button>
        </div>
        </div>
      </div>
      </div>
      <br />
      </div>

    )
  }
});
module.exports = FavMovieBox;
