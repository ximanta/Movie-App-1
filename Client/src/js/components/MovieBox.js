var React = require('react');
var But = require('./But');
var MovieBox = React.createClass({
  render:function(){
    var linkIMDB = "http://www.imdb.com/title/"+this.props.imdbId;
    return (
      <div>
      <h1>{this.props.title}</h1>
      <img src={this.props.imgurl} alt={this.props.title}/>
      <p>IMDB Id : {this.props.imdbId}</p>
      <p>Year : {this.props.year}</p>
      <But class="btn btn-primary" btnText="Add"/>
      <a href={linkIMDB} target="_blank">
      <But class="btn btn-success" btnText="View on IMDB"/>
      </a>
      </div>
    )
  }
});
module.exports = MovieBox;
