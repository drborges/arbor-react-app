import React, { Component } from "react"
import Store, { connect, timetravel } from "arbor-store"

import "./App.css"

const TimeMachine = timetravel(Store)
const store = new TimeMachine({
  timecontrol: {
    recording: false,
  },
  form: {
    todo: "",
  },
  todos: [
    { id: Math.random(), title: "Publish arbor to NPM", done: false },
    { id: Math.random(), title: "Implement arbor-react", done: true },
    { id: Math.random(), title: "Implement arbor-model", done: false },
    { id: Math.random(), title: "Support mutation path subscriptions", done: true },
    { id: Math.random(), title: "Implement arbor-timetravel", done: true },
  ]
})

class App extends Component {
  handleChange = ({ target }) => { this.props.form.todo = target.value }
  handleAddTodo = () => {
    this.props.todos.push({
      id: Math.random(),
      title: this.props.form.todo,
      done: false,
    })

    this.props.form.todo = ""
  }

  handleRecording = () => {
    this.props.timecontrol.recording = !this.props.timecontrol.recording

    if (store.timeline.isOn) {
      store.timeline.off()
    } else {
      store.timeline.on()
    }
  }

  renderTodo = (todo, i, todos) => {
    return (
      <li key={todo.id} className={todo.done ? "done" : "todo"}>
        <button onClick={() => todos.splice(i, 1)}>{'Remove'}</button>
        <input
            id={`todo-${i}`}
            type="checkbox"
            checked={todo.done}
            onChange={() => { todo.done = !todo.done }}
        />
        <label htmlFor={`todo-${i}`}>{todo.title}</label>
      </li>
    )
  }

  sortByTitle = () => this.props.todos.sort((todo1, todo2) => {
    if (todo1.title > todo2.title) return 1
    if (todo1.title < todo2.title) return -1
    return 0
  })

  sortByCompleteness = () => this.props.todos.sort((todo1, todo2) => {
    if (todo1.done) return 1
    if (todo2.done) return -1
    return 0
  })

  render() {
    return (
      <div className="app">
        <div className="time-control">
          <div>
            <button onClick={() => store.timeline.travel.step(-1)}>{'⬅️'}</button>
            <button onClick={this.handleRecording}>{this.props.timecontrol.recording ? '⏹️' : '⏺️'}</button>
            <span>{`Time Cursor: ${store.timeline.cursor}`}</span>
            <button onClick={() => store.timeline.travel.step(1)}>{'➡️'}</button>
          </div>
          <input
            type="range"
            min={0}
            max={store.timeline.history.length - 1}
            value={store.timeline.cursor}
            onChange={(event) => store.timeline.travel.to(event.target.valueAsNumber)}
          />
        </div>

        <div className="add-todo-form">
          <input
              value={this.props.form.todo}
              onChange={this.handleChange}
              onKeyPress={(e) => e.charCode === 13 && this.handleAddTodo()}
          />
          <button
              disabled={this.props.form.todo === ""}
              className="btn"
              onClick={this.handleAddTodo}
          >
            {'Add'}
          </button>
        </div>

        <div>
          {'Sort By: '}
          <a href="javascript:;" onClick={this.sortByTitle}>Title</a>
          <span>{' | '}</span>
          <a href="javascript:;" onClick={this.sortByCompleteness}>Done?</a>
          <span>{' | '}</span>
          <a href="javascript:;" onClick={() => this.props.todos.reverse()}>Reverse</a>
        </div>

        <ul>
          {this.props.todos.map(this.renderTodo)}
        </ul>
      </div>
    );
  }
}

export default connect(store)(App)
