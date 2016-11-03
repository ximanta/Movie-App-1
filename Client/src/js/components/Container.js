var React = require('react');
var MovieBox = require('./MovieBox1');
var Container = React.createClass({
render:function(){
  var MovieArray=[];
  if(this.props.dataC.hasOwnProperty("Error")){
    MovieArray = <h2>Movie Not Found</h2>
  }
  else{
  MovieArray = this.props.dataC.map(function(dataitem){
   return <MovieBox dataM={dataitem} />
 });
}

return (
  <div>
    {MovieArray}
  </div>
)
}
});
module.exports = Container;
