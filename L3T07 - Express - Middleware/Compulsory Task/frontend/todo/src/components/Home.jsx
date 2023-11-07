import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

import Register from "./Register";
import Login from "./Login";

const Home = () => {
  const ulrPath = "http://localhost:8080/";
  const jwt_token = sessionStorage.getItem("jwt_token");

  const fetchTodos = () => {
    axios
      .get(`${ulrPath}login/data`, {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InVzZXJAZ21haWwuY29tIn0.tsLERQIYGO9HiohxL677uVFuK-Am-6WmrEfufRnBUcU",
        },
      })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Axios grab todos
  useEffect(() => {
    fetchTodos();
  }, []);

  // Full todos list
  const [todos, setTodos] = useState([
    {
      todo_id: self.crypto.randomUUID(),
      todo_name: "mow lawn",
      todo_description: "mow lawn in garden",
    },
  ]);

  // State variables
  const [todo, setTodo] = useState({
    todo_id: "",
    todo_name: "",
    todo_description: "",
  });

  // Add todo
  const addTodo = (event) => {
    event.preventDefault();

    let todo_id = self.crypto.randomUUID();
    let todo_name = document.getElementById("add_todo_name").value;
    let todo_description = document.getElementById(
      "add_todo_description"
    ).value;

    const todo = {
      todo_id: DOMPurify.sanitize(todo_id),
      todo_name: DOMPurify.sanitize(todo_name),
      todo_description: DOMPurify.sanitize(todo_description),
    };
    // Send Post method to Express
    fetch(`${ulrPath}add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => {
        console.log(res);
        // Update state with new car
        setTodos([todo, ...todos]);
      })
      .catch((error) => {
        console.log(error);
      });

    clearAddForm();
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.todo_id !== id));
  };

  // Update todo
  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map((todo) => (todo.todo_id === id ? updatedTodo : todo)));
  };

  // Update state as I type in form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  // Clear out Add Todo Fields
  const clearAddForm = () => {
    setTodo({
      todo_id: "",
      todo_name: "",
      todo_description: "",
    });
  };

  return (
    <div>
      <Register ulrPath={ulrPath} />
      <Login ulrPath={ulrPath} />

      <>
        <h4>Add Todo</h4>
        <form onSubmit={addTodo}>
          <label>
            Todo Name:
            <input
              id="add_todo_name"
              type="text"
              name="todo_name"
              value={todo.todo_name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Todo Description:
            <input
              id="add_todo_description"
              type="text"
              name="todo_description"
              value={todo.todo_description}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit" className="btn btn-primary">
            Add Todo
          </button>
        </form>

        <h4>Todos</h4>
        <ul>
          {todos.map((todo) => (
            <li key={todo.todo_id}>
              <label>
                Todo Name:
                <input
                  type="text"
                  name="todo_name"
                  value={todo.todo_name}
                  onChange={(event) =>
                    updateTodo(todo.todo_id, {
                      ...todo,
                      todo_name: event.target.value,
                    })
                  }
                />
              </label>
              <br />
              <label>
                Todo Description:
                <input
                  type="text"
                  name="todo_description"
                  value={todo.todo_description}
                  onChange={(event) =>
                    updateTodo(todo.todo_id, {
                      ...todo,
                      todo_description: event.target.value,
                    })
                  }
                />
              </label>
              <br />
              <button
                onClick={() => deleteTodo(todo.todo_id)}
                className="btn btn-danger"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  updateTodo(todo.todo_id, {
                    ...todo,
                    todo_name: todo.todo_name,
                    todo_description: todo.todo_description,
                  })
                }
                className="btn btn-warning"
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </>
    </div>
  );
};

export default Home;
