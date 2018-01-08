export default class Form {
  handleInputChange({ target }) {
    this.todo = target.value
  }

  handleAddTodo(todos) {
    if (this.todo !== "") {
      todos.create(this.todo)
      this.todo = ""
    }
  }
}