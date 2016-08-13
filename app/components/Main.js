var React = require('react');

//{this.props.children} will render the routes inside Main route
var Main = React.createClass({
  render: function() {
    return (
      <div className='main-container'>
        {this.props.children}
      </div>
    )
  }
});

module.exports = Main;
