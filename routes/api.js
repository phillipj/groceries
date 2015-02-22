const url = require('url');

const actions = require('../actions/groceryActions');

function jsonParseBody(req, cb) {
	let data = '';
	req.on('data', (chunk) => data += chunk);
	req.on('end', () => cb(JSON.parse(data)));
}

module.exports = function apiRoutes(req, res) {
	jsonParseBody(req, (payload) => {

		if (req.url.indexOf('/add') > -1) {
			actions.add(payload.content);
		} else if (req.url.indexOf('/toggleDone') > -1) {
			actions.toggleDone(payload.content);
		}

		res.end('yii');
	});
};