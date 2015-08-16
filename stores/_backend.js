const Immutable = require('immutable');
const level = require('levelup');

const db = level(process.env.DB_PATH || 'dev.db', {valueEncoding: 'json'}, function(err) {
	if (err) { return console.error('Error while connecting to leveldb!', err.stack); }
	console.log('Connected to leveldb')
});

let items = Immutable.List();

module.exports = {
	init() {
		db.createValueStream()
			.on('data', function onDbData(data) {
				items = items.push(data);
			})
			.on('end', function() {
				console.log('finished reading all items', items);
			});
	},

	items() {
		return items;
	},

	save(data) {
		db.put(Date.now(), data, function onPutResult(err) {
			if (err) {
				return console.error('Error while putting data into DB:', err.stack);
			}
			items = items.unshift(data);
		})
	}
};