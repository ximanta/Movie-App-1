var React = require('react');
var FavMovieBox = React.createClass({
  getInitialState:function(){
    return ({
      com:{imdbID:this.props.dataM.imdbID,Comment:""}
    });
  },
  updateCommentfromDB:function(c){
    var updateHandler = this.props.updateStateHandlerRef.bind(null,this.props.dataM.imdbID,c);
    $.ajax({
    url:'http://localhost:8080/movie/update',
    type:'PUT',
    data:this.state.com,
    success:function(data){
    //  alert(data);
      updateHandler();
    }.bind(this),
    error:function(err){
      console.log(err);
    }.bind(this)
  });
  },
  onCommentChange:function(evt){
    var temp = this.state.com;
    temp["Comment"] = prompt("Enter comment","");
    this.setState({com:temp});
    this.updateCommentfromDB(temp["Comment"]);
  },
  deleteMovieFromDB:function(){
    var deleteMovieHandler=this.props.deleteStateHandlerRef.bind(null,this.props.dataM.imdbID);
        $.ajax({
        url:'http://localhost:8080/movie/delete?imdbID='+this.props.dataM.imdbID,
        type:'DELETE',
        success:function(data){
          deleteMovieHandler();
        //  alert(data);
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
        <button className="btn btn-primary" onClick={this.onCommentChange}>Comment</button>
        </div>
        <div className="col-md-2">
        <button className="btn btn-danger" onClick={this.deleteMovieFromDB} >Delete</button>
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
