import React from 'react'
import Reflux from 'reflux'

import store from '../stores/groceryStore'
import actions from '../actions/groceryActions'

const GroceryItem = React.createClass({
  propTypes: {
    content: React.PropTypes.string.isRequired,
    done: React.PropTypes.bool.isRequired
  },

  handleChange() {
    actions.toggleDone(this.props.content)
  },

  render() {
    const isDone = this.props.done

    return (
      <li style={{'color': isDone ? 'grey' : 'black'}}>
        <label>
          <input type='checkbox' value={this.props.content} checked={isDone} onChange={this.handleChange}  /> <span className='h4'>{this.props.content}</span>
        </label>
      </li>
    )
  }
})

const GroceryList = React.createClass({
  mixins: [Reflux.connect(store, 'groceries')],

  render() {
    const items = this.state.groceries.map((grocery, idx) => {
      return <GroceryItem content={grocery.content} done={grocery.done} key={idx} />
    })

    return (
      <ul className='list-unstyled' style={{marginTop: '15px'}}>{items}</ul>
    )
  }
})

export default GroceryList
