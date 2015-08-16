const Reflux = require('reflux');

const Immutable = require('immutable');

const backend = require('./_backend');
const groceryActions = require('../actions/groceryActions');

let items;

module.exports = Reflux.createStore({
	listenables: groceryActions,

	init() {
		backend.init((_items) => {
			items = Immutable.List(_items);
		});
	},

	getInitialState() {
		return backend.items();
	},

	hydrate() {
		return JSON.stringify(backend.items());
	},

	rehydrate(oldState) {
		items = Immutable.List(oldState);
	},

	onAdd(content) {
		if (!content.length) { return; }

		var data = {
			content,
			done: false
		};

		items = items.unshift(data);
		this.trigger(items);

		backend.save(content, function(err) {
			if (err) {
				alert('Gikk til helvette!');
				return console.error('Error while saving in backend:', err.stack);
			}
		});
	},

	onToggleDone(content) {
		const idx = items.findIndex((g) => g.content == content);
		items = items.updateIn([idx], (g) => {
			g.done = !g.done;
			return g;
		});

		this.trigger(items);

		backend.toggleDone(items.get(idx));
	}
});