import "./TodoList.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [todos, setTodos] = useState([
    {
      task: "Sample Task",
      id: uuidv4(),
      completed: false,
      createdAt: new Date().toLocaleTimeString(),
    },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const addNewTask = () => {
    if (newTodo.trim() === "") return;

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        task: newTodo,
        id: uuidv4(),
        completed: false,
        createdAt: new Date().toLocaleTimeString(),
      },
    ]);

    setNewTodo("");
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const upperCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        task: todo.task.toUpperCase(),
      }))
    );
  };

  return (
    <div className="todo-container">
      <h1>📝 My Todo List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addNewTask();
            }
          }}
        />

        <button className="add-btn" onClick={addNewTask}>
          Add
        </button>
      </div>

      <h3>Total Tasks: {todos.length}</h3>

      <hr />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <span
                style={{
                  textDecoration: todo.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {todo.task}
              </span>

              <small> ({todo.createdAt})</small>
            </div>

            <div className="task-actions">
              <button
                className="done-btn"
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.completed ? "Undo" : "Done"}
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="upper-all-btn"
        onClick={upperCaseAll}
      >
        Uppercase All
      </button>
    </div>
  );
}