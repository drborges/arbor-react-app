import React from "react"
import connect from "arbor-react"
import Arbor, { timetravel } from "arbor-store"

import { Timecontrol, TodoForm, TodoItem, SortingOptions } from "./components"
import { Form, Todo, Todos, Recorder } from "./models"

import "./App.css"

const initialState = {
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
}

const store = timetravel(new Arbor(initialState))

store.bind(Form).to("/form")
store.bind(Todos).to("/todos")
store.bind(Todo).to("/todos/:index")
store.bind(Recorder).to("/recorder")

const App = ({ form, recorder, todos }) => (
  <div className="app">
    <Timecontrol timeline={store.timeline} recorder={recorder} />

    <TodoForm form={form} todos={todos} />

    <SortingOptions todos={todos} />

    <ul>
      {todos.map((todo, i) => (
        <TodoItem
            key={todo.id}
            todo={todo}
            onRemove={() => todos.splice(i, 1)}
            onToggle={todo.toggle}
        />
      ))}
    </ul>

    {todos.isEmpty && <div>{'Well done! You finished all you todo items!'}</div>}
  </div>
)

export default connect(store)(App)
