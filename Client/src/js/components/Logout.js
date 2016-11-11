var React = require('react');
var {browserHistory} = require('react-router');
var Logout = React.createClass({
  getInitialState:function(){
    return {
      status:"Not"
    }
  },
  componentWillMount:function(){
    $.ajax({
      url:"http://localhost:8080/logout",
      type:"GET",
      success:function(data){
        console.log(data);
        this.changeState();
        browserHistory.push("/");
      }.bind(this),
      error:function(err){
        console.log(err);
      }.bind(this)
    });
  },
  changeState:function(){
    this.setState({status:""});
  },
  render:function(){
    return (
      <div>
      <h3>User {this.state.status} Logged Out</h3>
      </div>
    )
  }
});
module.exports = Logout;
