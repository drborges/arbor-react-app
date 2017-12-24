import React from "react"
import Store, { connect, timetravel, MTree } from "arbor-store"

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
