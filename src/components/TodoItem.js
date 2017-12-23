import React from "react"

/**
 * This is an example of a component decoupled from Arbor. Every interaction with
 * it, takes place through event handlers passed in via props.
 */
const TodoItem = ({ todo, onRemove, onToggle }) => (
  <li className={todo.done ? "done" : "todo"}>
    <button onClick={onRemove}>{'Remove'}</button>
    <input
        id={todo.id}
        type="checkbox"
        checked={todo.done}
        onChange={onToggle}
    />
    <label htmlFor={todo.id}>{todo.title}</label>
  </li>
)

export default TodoItem