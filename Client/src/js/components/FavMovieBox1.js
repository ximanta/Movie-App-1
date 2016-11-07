var React = require('react');
var FavMovieBox = React.createClass({
  getInitialState:function(){
    return ({
       text:""
    });
  },
  updateCommentfromDB:function(){
    var updateHandler = this.props.updateStateHandlerRef.bind(null,this.props.dataM.imdbID,this.state.text);
    $.ajax({
    url:'http://localhost:8080/movie/update',
    type:'PUT',
    data:{imdbID:this.props.dataM.imdbID,Comment:this.state.text},
    success:function(data){
      updateHandler();
    //  $('#myModal').modal('hide');
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
    this.updateCommentfromDB();
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
    return (
      <div>
     <div className="row">
       <div className="col-md-6" id="left">
       <br/>
           <img  src={this.props.dataM.Poster} id="imgheight"/>
       </div>
     <div className="col-md-6" id="right">
     <br/>
      <h3>{this.props.dataM.Title}</h3>
      <h3>{this.props.dataM.Year}</h3>
      <h3>{this.props.dataM.Type}</h3>
      <h3>{this.props.dataM.Comment}</h3>
      <p><button className="btn btn-primary" data-toggle="modal" data-target='#myModal'>Comment </button><span>&nbsp;&emsp;</span>
         <button  className="btn btn-warning" onClick={this.deleteMovieFromDB} >Delete</button></p>
      </div>
      </div>


      <div id='myModal' className="modal fade" role="dialog">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Modal Header</h4>
      </div>
      <div className="modal-body">
      <form className="form-horizontal">
  <div className="form-group">
      <label form="title" className="control-label col-xs-2">Comment</label>
      <div className="col-xs-10">
          <input type="text" className="form-control" id="title" placeholder={this.props.dataM.Comment} onChange={this.changeHandler}/>
      </div>
  </div>
  <div className="col-xs-12">
  <center><button type="button" className="btn btn-primary " onClick={this.clickHandler} >Update Comment</button></center>
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
    )
  }
});
module.exports = FavMovieBox;
