var React = require('react');
var FavMovieBox = React.createClass({
  getInitialState:function(){
    return ({
       text:""
    });
  },
  updateCommentfromDB:function(c){
    var updateHandler = this.props.updateStateHandlerRef.bind(null,this.props.dataM.imdbID,c);
    $.ajax({
    url:'http://localhost:8080/movie/update',
    type:'PUT',
    data:this.state.com,
    success:function(data){
      updateHandler();
      $('#myModal').modal('hide');
    }.bind(this),
    error:function(err){
      console.log(err);
    }.bind(this)
  });
  },
  changeHandler:function(evt){
    this.setState({text:evt.target.value});
  },
  clickHandler:function(){
    this.updateCommentfromDB(this.state.text);
  },
  deleteMovieFromDB:function(){
    var deleteMovieHandler=this.props.deleteStateHandlerRef.bind(null,this.props.dataM.imdbID);
        $.ajax({
        url:'http://localhost:8080/movie/delete?imdbID='+this.props.dataM.imdbID,
        type:'DELETE',
        success:function(data){
          deleteMovieHandler();
        }.bind(this),
        error:function(err){
          console.log(err);
        }.bind(this)
      });

  },
  render:function(){
    var linkIMDB = "http://www.imdb.com/title/"+this.props.dataM.imdbID;
    return (
      <div>
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
        <button className="btn btn-primary" data-toggle="modal" data-target="#myModal">Comment </button><span>&nbsp;&emsp;</span>

        <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Modal Header</h4>
            </div>

            <div className="modal-body">
              <form className="form-horizontal">
          <div className="form-group">
              <label form="title" className="control-label col-xs-2">Comments : </label>
              <div className="col-xs-10">
                  <input type="text" className="form-control" id="title" placeholder="Comment" onChange={this.changeHandler}/>
              </div>
          </div>
          <div className="col-xs-12">
          <center><button type="button" className="btn btn-primary " onClick={this.clickHandler}>Update Comment</button></center>
        </div>
        </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
        </div>
        

        </div>
        <div className="col-md-2">
        <button className="btn btn-danger" onClick={this.deleteMovieFromDB} >Delete</button>
        </div>


        </div>
      </div>
      </div>
      </div>
      </div>
    )
  }
});
module.exports = FavMovieBox;
