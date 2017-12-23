export default class Todos {
  create(title) {
    this.push({ id: Math.random(), title: title, done: false })
  }

  sortByTitle() {
    this.sort((todo1, todo2) => {
      if (todo1.title > todo2.title) return 1
      if (todo1.title < todo2.title) return -1
      return 0
    })
  }

  sortByCompleteness() {
    this.sort((todo1, todo2) => {
      if (todo1.done) return 1
      if (todo2.done) return -1
      return 0
    })
  }
}