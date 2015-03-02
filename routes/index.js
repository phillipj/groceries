const fs = require('fs');
const React = require('react');

const scriptManifest = require('../public/js/manifest');
const store = require('../stores/groceryStore');
const App = React.createFactory(require('../components/App.jsx'));

const isProd = process.env.NODE_ENV == 'production';

function respondToReq(res, err, buffer) {
	if (err) {
		console.error(err);
		res.statusCode = 500;
		return res.end('Something went horribly wrong :/');
	}

	const markup = buffer.toString();
	const rendered = React.renderToString(App());
	const bundlePath = isProd ?
		scriptManifest['js/bundle.js'] :
		'http://localhost:8090/bundle.js';

	const content = markup.replace('REACTIFY', rendered)
						.replace('BUNDLE_PATH', bundlePath)
						.replace('STATE', store.hydrate());

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(content);
}

module.exports = function indexRoute(req, res) {
	fs.readFile('public/index.html', respondToReq.bind(null, res));
};
