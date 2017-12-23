export default class Form {
  handleChange({ target }) {
    this.todo = target.value
  }

  handleAddTodo(todos) {
    if (this.todo !== "") {
      todos.create(this.todo)
      this.todo = ""
    }
  }
}