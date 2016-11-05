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
      <div style={{backgroundColor:'#B2BABB '}} className="jumbotron text-center" >
             <h1>Search Your Movie</h1>
             <p>Enter movie name</p>
             <input type="text"   size="50"  onChange={this.changeHandler} onKeyPress={this.runScript} />
              <input type="button"   className="btn btn-warning" value="Search" onClick={this.props.clickHandler} />
         </div>

    )
  }
});
module.exports = Search;
/*<div>
<input className="form-control" type="text" onChange={this.changeHandler} />
<button className="btn btn-warning" onClick={this.props.clickHandler} >Search</button>
</div>
*/
