import React, { Component } from "react"
import Store, { connect, timetravel, MTree, Model } from "arbor-store"

import { Timecontrol, TodoForm, TodoItem, SortingOptions } from "./components"
import { Form, Todo, Todos, Recorder } from "./models"

import "./App.css"

const TimeMachine = timetravel(Store)
const store = new TimeMachine({
  recorder: {
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
}, { Engine: MTree })

store.tree.register("/form", Form)
store.tree.register("/todos", Todos)
store.tree.register("/recorder", Recorder)
store.tree.register("/todos/:index", Todo)

class App extends Component {
  render() {
    return (
      <div className="app">
        <Timecontrol timeline={store.timeline} recorder={this.props.recorder} />

        <TodoForm form={this.props.form} todos={this.props.todos} />

        <SortingOptions todos={this.props.todos} />

        <ul>
          {this.props.todos.map((todo, i) => (
            <TodoItem
                key={todo.id}
                todo={todo}
                onRemove={() => this.props.todos.splice(i, 1)}
                onToggle={todo.toggle}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(store)(App)
