import React from "react"

const SortingOptions = ({ todos }) => (
  <div>
    {'Sort By: '}
    <button onClick={todos.sortByTitle}>Title</button>
    <button onClick={todos.sortByCompleteness}>Done?</button>
    <button onClick={todos.reverse}>Reverse</button>
  </div>
)

export default SortingOptions