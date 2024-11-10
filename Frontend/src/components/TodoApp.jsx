// src/components/TodoApp.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      axios
        .post("http://localhost:5000/api/todos", { text: newTodo })
        .then((response) => {
          setTodos([...todos, response.data]);
          setNewTodo("");
        })
        .catch((error) => console.log(error));
    }
  };

  const toggleComplete = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    axios
      .put(`http://localhost:5000/api/todos/${id}`, {
        completed: !todo.completed,
      })
      .then((response) => {
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? response.data : todo
        );
        setTodos(updatedTodos);
      })
      .catch((error) => console.log(error));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="todo-container">
      <div id="inputcont">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? "completed" : ""}>
            {todo.text}
            <div className="listCont">
            <button onClick={() => toggleComplete(todo._id)}>Complete</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
