var React = require('react');
var {Link} = require('react-router');
var Navbar = React.createClass({
  render:function(){
    return(
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
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/favorite">Favorite</Link>
          </li>
        </ul>
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
    )
  }
});
module.exports = Navbar;
