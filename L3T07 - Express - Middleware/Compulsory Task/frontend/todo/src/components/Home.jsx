import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const ulrPath = "http://localhost:8080/todos/";

function Home() {
  const [todos, setTodos] = useState([]);
  const token_storage = sessionStorage.getItem("jwt_token");

  // READ
  useEffect(() => {
    fetch(`${ulrPath}secure/`)
      .then((res) => res.json())
      // Show latest additions first
      .then((data) => setTodos(data.reverse()));
  }, []);

  // CREATE
  const handleAddTodo = (event) => {
    event.preventDefault();

    let todo_name = document.getElementById("todo_name_add").value;
    let todo_description = document.getElementById(
      "todo_description_add"
    ).value;

    const todo = {
      todo_id: self.crypto.randomUUID(),
      todo_name: DOMPurify.sanitize(todo_name),
      todo_description: DOMPurify.sanitize(todo_description),
      token_storage: token_storage,
    };
    // Send Post to Express
    fetch(`${ulrPath}secure/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => {
        console.log(res);
        setTodos([todo, ...todos]);
      })
      .then(() => {
        Swal.fire({
          title: `Todo created!`,
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // CLEAR ADD Form
  const handleClearAddTodo = () => {
    document.getElementById("todo_name_add").value = "";
    document.getElementById("todo_description_add").value = "";
  };

  // DELETE
  const deleteTodo = async (todo_id) => {
    const url = `${ulrPath}secure/delete-todo/${todo_id}`;

    // Make sure token_storage is added to body
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token_storage }),
    });

    if (res.ok) {
      Swal.fire({
        title: `Todo deleted.`,
        icon: "warning",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== todo_id));
    } else {
      console.error(`Failed to delete todo:`);
    }
  };

  // UPDATE
  const updateTodo = (todo_id) => {
    const upTodo = {
      todo_name: DOMPurify.sanitize(
        document.getElementById(`todo_name-${todo_id}`).value
      ),
      todo_description: DOMPurify.sanitize(
        document.getElementById(`todo_description-${todo_id}`).value
      ),
      token_storage: token_storage,
    };

    // Find todo to update
    const updatedTodo = todos.find((todo) => todo.todo_id === todo_id);
    setTodos(
      todos.map((todo) => (todo.todo_id === todo_id ? updatedTodo : todo))
    );

    Swal.fire({
      title: `Todo updated.`,
      icon: "info",
    });

    // PUT
    const url = `${ulrPath}secure/update-todo/${todo_id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upTodo),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <AddTodo
        handleAddTodo={handleAddTodo}
        handleClearAddTodo={handleClearAddTodo}
      />

      <TodoItem todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default Home;
