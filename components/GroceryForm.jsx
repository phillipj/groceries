const React = require('react/addons');

const actions = require('../actions/groceryActions');

const GroceryForm = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	getInitialState() {
		return { content: '' };
	},

	handleSubmit(e) {
		e.preventDefault();
		actions.add(this.state.content);
		this.setState({ content: '' });
	},

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" className="form-control input-lg" valueLink={this.linkState('content')} placeholder='Skriv inn matvare...' />
			</form>
		);
	}
});

module.exports = GroceryForm;
