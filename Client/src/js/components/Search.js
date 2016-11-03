var React = require('react');
var But = require('./But');
var Search = React.createClass({

  changeHandler:function(event){
    this.props.changeHandler.call(null,event.target.value);
  },

  render:function(){
    return (
      <div>
     <input type="text" onChange={this.changeHandler} />
     <But class="btn btn-warning" btnText="Search" clickHandler={this.props.clickHandler} />
      </div>
    )
  }
});
module.exports = Search;
