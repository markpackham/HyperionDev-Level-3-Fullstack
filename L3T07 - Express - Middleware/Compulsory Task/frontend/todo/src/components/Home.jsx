import { useState } from "react";

const Home = () => {
  const [todos, setTodos] = useState([
    {
      todo_id: 1,
      todo_name: "mow lawn",
      todo_description: "mow lawn in garden",
    },
  ]);

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
      <form onSubmit={addTodo}>
        <label>
          Todo Name:
          <input
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
            {todo.todo_id} - {todo.todo_name} - {todo.todo_description}
            <button onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
            <button onClick={() => updateTodo(todo.todo_id, todo)}>
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
