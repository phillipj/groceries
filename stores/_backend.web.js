const Immutable = require('immutable');
const xhr = require('xhr');

let items = Immutable.List();

module.exports = {
	init() {},

	items() {
		return items;
	},

	save(content) {
		xhr({
			uri: '/api/add',
			json: { content },
			method: 'POST'
		}, (err) => {
			if (err) {
		       alert('Gah, something failed! ' + err);
			}
		});
	},

	toggleDone(item) {
		xhr({
			uri: '/api/toggleDone',
			json: item,
			method: 'POST'
		}, (err) => {
			if (err) {
				alert('Gah, something failed! ' + err);
			}
		});
	}
};