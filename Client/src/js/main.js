var React = require('react');
var ReactDOM = require('react-dom');
var {browserHistory,Route,Router,IndexRoute}=require('react-router');
var Home = require("./components/home");
var Navbar = require('./components/Navbar');
var FavMovie = require('./components/FavMovie');
var Signup = require('./components/signup');
var Login = require('./components/login');
var Logout = require('./components/logout');
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
  <Router history={browserHistory}>
  <Route path="/" component={MainComponent}>
  <IndexRoute component={Login}/>
  <Route path="/search" component={Home}/>
  <Route path="/favorite" component={FavMovie}/>
  <Route path="/logout" component={Logout}/>
  <Route path="/login" component={Login}/>
  <Route path="/signup" component={Signup}/>
    </Route>
    </Router>,
document.getElementById('app'));
