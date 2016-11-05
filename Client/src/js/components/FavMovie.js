var React = require('react');
var FavMovieBox = require('./FavMovieBox');
var FavMovie = React.createClass({
  getInitialState:function(){
    return ({
      MovieArray:[]
    });
  },
  getMoviesFromDB:function(){
    $.ajax({
    url:'http://localhost:8080/movie/get',
    type:'GET',
    dataType:'JSON',
    success:function(data){
      this.setState({MovieArray:data});
      console.log("success");
    }.bind(this),
    error:function(err){
      console.log(err);
    }.bind(this)
  });
  },
  componentWillMount:function(){
    this.getMoviesFromDB();
  },
  render:function(){
    var ArrayBox=[];
    if(this.state.MovieArray.length==0){
      ArrayBox = <h3>No Movie Added to Favorite yet!</h3>
    }
    else{
    ArrayBox = this.state.MovieArray.map(function(dataitem){
     return <FavMovieBox dataM={dataitem} refresh={this.componentWillMount}/>
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
