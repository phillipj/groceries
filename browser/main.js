const React = require('react');

const App = React.createFactory(require('../components/App.jsx'));
const store = require('../stores/groceryStore');

const state = JSON.parse(document.getElementById('state').textContent);

store.rehydrate(state);

React.render(App(), document.getElementById('app'))