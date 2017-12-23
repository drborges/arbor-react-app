export default class Form {
  handleChange({ target }) {
    this.todo = target.value
  }

  handleAddTodo(todos) {
    todos.create(this.todo)
    this.todo = ""
  }
}