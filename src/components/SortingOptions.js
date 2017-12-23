import React from "react"

const SortingOptions = ({ todos }) => (
  <div>
    {'Sort By: '}
    <a href="javascript:;" onClick={todos.sortByTitle}>Title</a>
    <span>{' | '}</span>
    <a href="javascript:;" onClick={todos.sortByCompleteness}>Done?</a>
    <span>{' | '}</span>
    <a href="javascript:;" onClick={todos.reverse}>Reverse</a>
  </div>
)

export default SortingOptions