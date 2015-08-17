import Reflux from 'reflux'
import Immutable from 'immutable'
import xhr from 'xhr'

import groceryActions from '../actions/groceryActions'

const isBrowser = (typeof window !== 'undefined')

let items = Immutable.List()

export default Reflux.createStore({
  listenables: groceryActions,

  getInitialState () {
    return items
  },

  hydrate () {
    return JSON.stringify(items)
  },

  rehydrate (oldState) {
    items = Immutable.List(oldState)
  },

  onAdd (content) {
    if (!content.length) { return }

    items = items.unshift({
      content,
      done: false
    })

    this.trigger(items)

    if (isBrowser) {
      xhr({
        uri: '/api/add',
        json: { content },
        method: 'POST'
      }, (err) => {
        if (err) {
          window.alert('Gah, something failed! ' + err)
        }
      })
    }
  },

  onToggleDone (content) {
    const idx = items.findIndex((g) => g.content === content)
    items = items.updateIn([idx], (g) => {
      g.done = !g.done
      return g
    })

    this.trigger(items)

    if (isBrowser) {
      xhr({
        uri: '/api/toggleDone',
        json: items.get(idx),
        method: 'POST'
      }, (err) => {
        if (err) {
          window.alert('Gah, something failed! ' + err)
        }
      })
    }
  }
})
