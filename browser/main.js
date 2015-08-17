import React from 'react'

import App from '../universal/components/App'
import store from '../universal/stores/groceryStore'

const AppComponent = React.createFactory(App)

const state = JSON.parse(document.getElementById('state').textContent)

store.rehydrate(state)

React.render(AppComponent(), document.getElementById('app'))
