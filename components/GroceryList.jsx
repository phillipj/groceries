const React = require('react');
const Reflux = require('reflux');

const store = require('../stores/groceryStore');
const actions = require('../actions/groceryActions');

const GroceryItem = React.createClass({
	propTypes: {
		content: React.PropTypes.string.isRequired,
		done: React.PropTypes.bool.isRequired
	},

	handleChange() {
		actions.toggleDone(this.props.content);
	},

	render() {
		const isDone = this.props.done;

		return (
			<li style={{'color': isDone ? 'grey' : 'black'}}>
				<label>
					<input type='checkbox' value={this.props.content} checked={isDone} onChange={this.handleChange}  /> {this.props.content}
				</label>
			</li>
		);
	}
});

const GroceryList = React.createClass({
	mixins: [Reflux.connect(store, 'groceries')],

	render() {
		// can omit .toJS() on v0.13 of React
		const items = this.state.groceries.map(grocery => {
			return <GroceryItem content={grocery.content} done={grocery.done} />
		}).toJS();

		return (
			<ul className='list-unstyled' style={{marginTop: '15px'}}>{items}</ul>
		);
	}
});

module.exports = GroceryList;