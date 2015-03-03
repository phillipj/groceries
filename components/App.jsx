const React = require('react');

const GroceryForm = require('./GroceryForm.jsx');
const GroceryList = require('./GroceryList.jsx');

const App = React.createClass({
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
