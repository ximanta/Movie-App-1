var React = require('react');
var ReactDOM = require('react-dom');
var Search = require("./components/Search");
var Container = require("./components/Container");
var MainComponent = React.createClass({
  getMovieData :function(title){
    $.ajax({
      url:'http://www.omdbapi.com/?s='+title,
      type:'GET',
      dataType:'JSON',
      success:function(data){
        if(data.hasOwnProperty("Search")){
        this.setState({dataMovie:data.Search});
      }
        else {
          this.setState({dataMovie:data});
        }
      }.bind(this),
      error:function(err){
        console.log(err);
      }.bind(this)
    });
  },
  clickHandler:function(){
   var text = this.state.Tvalue;
    this.getMovieData(text);
  },
  getInitialState:function(){
    return {
      Tvalue : "",
      dataMovie : []
    };
  },
  changeHandler:function(data){
    this.setState({Tvalue:data});
  },
  render:function(){
    return (
      <div>
        <Search clickHandler={this.clickHandler} changeHandler={this.changeHandler}/><br/>
        <Container dataC = {this.state.dataMovie} />
      </div>
    )
  }
});
ReactDOM.render(<MainComponent />,
document.getElementById('app'));
