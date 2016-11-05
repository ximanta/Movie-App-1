var React = require('react');
var FavMovieBox = require('./FavMovieBox');
var FavMovie = React.createClass({
  getInitialState:function(){
    return ({
      MovieArray:[]
    });
  },
  onUpdateStateHandler:function(imdbID,Comment){
    var temp = this.state.MovieArray;
    var j=-1;
    for(var i=0;i<temp.length;i++){
      if(temp[i].imdbID==imdbID)
      {
        j=i;
        break;
      }
    }
    temp[i]["Comment"]=Comment;
    this.setState({MovieArray:temp});
  },
  onDeleteStateHandler: function(imdbID){
    var temp = this.state.MovieArray;
    var j=-1;
    for(var i=0;i<temp.length;i++){
      if(temp[i].imdbID==imdbID)
      {
        j=i;
        break;
      }
    }
    if(j>-1){
      temp.splice(j,1);
    }
    this.setState({MovieArray:temp});
  },
  getMoviesFromDB:function(){
    $.ajax({
    url:'http://localhost:8080/movie/get',
    type:'GET',
    dataType:'JSON',
    success:function(data){
      this.setState({MovieArray:data});
    }.bind(this),
    error:function(err){
      console.log(err);
    }.bind(this)
  });
  },
  componentDidMount:function(){
    this.getMoviesFromDB();
  },
  render:function(){
    var ArrayBox=[];
    if(this.state.MovieArray.length==0){
      ArrayBox = <h3>No Movie Added to Favorite yet!</h3>
    }
    else{
      var delHandler=this.onDeleteStateHandler;
      var upHandler = this.onUpdateStateHandler;
    ArrayBox = this.state.MovieArray.map(function(dataitem){
     return <FavMovieBox deleteStateHandlerRef={delHandler} updateStateHandlerRef={upHandler} dataM={dataitem} />
   });
  }
  return (
    <div>
      {ArrayBox}
    </div>
  )
  }
});
module.exports = FavMovie;
