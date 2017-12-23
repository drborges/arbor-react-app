import React from "react"

const TodoForm = ({ form, todos }) => (
  <div className="add-todo-form">
    <input
        value={form.todo}
        onChange={form.handleChange}
        onKeyPress={(e) => e.charCode === 13 && form.handleAddTodo(todos)}
    />
    <button
        disabled={form.todo === ""}
        className="btn"
        onClick={() => form.handleAddTodo(todos)}
    >
      {'Add'}
    </button>
  </div>
)

export default TodoForm