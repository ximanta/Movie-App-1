var React = require('react');
var {browserHistory} = require('react-router');
var Login = React.createClass({
  getInitialState:function(){
    return {
      username:"",
      password:""
    };
  },
  UserChangeHandler:function(evt){
    this.setState({username:evt.target.value});
  },
  PassChangehandler:function(evt){
    this.setState({password:evt.target.value});
  },
  ClickHandler:function(){
    $.ajax({
      url:"http://localhost:8080/login",
      type:'POST',
      data:{username:this.state.username,password:this.state.password},
      success:function(data){
      //  alert(data);
      browserHistory.push("/search");
      }.bind(this),
      error:function(err){
        console.log(err);
      }.bind(this)
    });
  },
render:function(){
  return (
    <div>
    <p>Username:</p><input type="text" onChange={this.UserChangeHandler} ></input>
    <p>Password:</p><input type="password" onChange={this.PassChangehandler} ></input>
    <p><input type="button" onClick={this.ClickHandler} value="Login"></input></p>
    </div>
  )
}
});
module.exports= Login;
