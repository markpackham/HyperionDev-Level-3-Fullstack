import { useEffect, useState } from "react";
import axios from "axios";
import Register from "./Register";
import Login from "./Login";

const Home = () => {
  const ulrPath = "http://localhost:8080/";

  // Axios grab todos
  useEffect(() => {
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
    setTodos([...todos, { ...todo, todo_id: self.crypto.randomUUID() }]);
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

  return (
    <div>
      <Register ulrPath={ulrPath} />
      <Login ulrPath={ulrPath} />

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
        <button type="submit">Add Todo</button>
      </form>

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
            <button onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
            <button
              onClick={() =>
                updateTodo(todo.todo_id, {
                  ...todo,
                  todo_name: todo.todo_name,
                  todo_description: todo.todo_description,
                })
              }
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
