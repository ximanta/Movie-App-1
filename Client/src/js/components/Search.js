var React = require('react');
var But = require('./But');
var Search = React.createClass({

  changeHandler:function(event){
    this.props.changeHandler.call(null,event.target.value);
  },
  runScript:function(e) {
    if (e.key == 'Enter') {
        this.props.clickHandler.call(null);
    }
},
  render:function(){
    return (
      <div>
      <div className="container-fluid">
   	<div className="row">
   		<div className="col-md-12">
   			<nav className="navbar navbar-default" role="navigation">
   				<div className="navbar-header">

   					<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
   						 <span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
   					</button> <a className="navbar-brand" href="#">React Movie App</a>
   				</div>

   				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
   					<ul className="nav navbar-nav">
   						<li className="active">
   							<a href="#">Search</a>
   						</li>
   						<li>
   							<a href="#">All Movies</a>
   						</li>
   					</ul>
   					<div className="navbar-form navbar-left form-group" role="search">
               <input className="form-control" type="text" onChange={this.changeHandler} onKeyPress={this.runScript}/>
              <button className="btn btn-warning" onClick={this.props.clickHandler} >Search</button>
   					</div>
   					<ul className="nav navbar-nav navbar-right">
   						<li>
   							<a href="#">My Account</a>
   						</li>
   					</ul>
   				</div>

   			</nav>
   		</div>
   	</div>
   </div>
      </div>
    )
  }
});
module.exports = Search;
