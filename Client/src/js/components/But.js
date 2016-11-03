var React = require('react');
var But = React.createClass({
  render:function(){
    return (
      <div>
        <button className={this.props.class} onClick={this.props.clickHandler} >{this.props.btnText}</button>
      </div>
    )
  }
});
module.exports = But;
