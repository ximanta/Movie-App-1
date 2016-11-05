var React = require('react');
var ReactDOM = require('react-dom');
var {hashHistory,Route,Router,IndexRoute}=require('react-router');
var Home = require("./components/home");
var Navbar = require('./components/Navbar');
var FavMovie = require('./components/FavMovie');
var MainComponent = React.createClass({
  render:function(){
    return (
      <div>
      <Navbar />
      {this.props.children}
      </div>
    )
  }
});
ReactDOM.render(
  <Router history={hashHistory}>
  <Route path="/" component={MainComponent}>
  <IndexRoute component={Home}/>
  <Route path="/search" component={Home}/>
  <Route path="/favorite" component={FavMovie}/>
    </Route>
    </Router>,
document.getElementById('app'));
