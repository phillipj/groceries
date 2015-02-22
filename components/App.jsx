var React = require('react');

var GroceryForm = require('./GroceryForm.jsx');
var GroceryList = require('./GroceryList.jsx');

var App = React.createClass({
  render() {
    return (
    	<div>
			<GroceryForm />
			<GroceryList />
		</div>
    );
  }
});

module.exports = App;