import React from 'react'

import GroceryForm from './GroceryForm'
import GroceryList from './GroceryList'

export default React.createClass({
  render() {
    return (
      <div>
      <GroceryForm />
      <GroceryList />
      </div>
    )
  }
})
