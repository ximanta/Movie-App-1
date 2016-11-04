var React = require('react');
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
   <input className="form-control" type="text" onChange={this.changeHandler} onKeyPress={this.runScript}/>
  <button className="btn btn-warning" onClick={this.props.clickHandler} >Search</button>
      </div>
    )
  }
});
module.exports = Search;
