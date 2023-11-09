import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { urlPath } from "../global";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

function Home() {
  const [todos, setTodos] = useState([]);
  // Grab session storage, will be empty for logged out users
  const token_storage = sessionStorage.getItem("jwt_token");

  // READ
  useEffect(() => {
    // Only call if we have a jwt token
    // Need to use POST instead of GET to send token
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token_storage }),
    };
    fetch(`${urlPath}secure/`, requestOptions)
      .then((res) => res.json())
      // Show latest first
      .then((data) => setTodos(data.reverse()));
  }, [token_storage]);

  // CREATE
  const handleAddTodo = (event) => {
    event.preventDefault();

    const todo_name = document.getElementById("todo_name_add").value;
    const todo_description = document.getElementById(
      "todo_description_add"
    ).value;

    // Don't allow empty todos to be sent to db
    // can't currently handle error with formik
    if (todo_name.length < 1 || todo_description.length < 1) {
      Swal.fire({
        title: `All Todos need names & descriptions.`,
        icon: "warning",
      });

      return;
    }

    const todo = {
      todo_id: self.crypto.randomUUID(),
      todo_name: DOMPurify.sanitize(todo_name),
      todo_description: DOMPurify.sanitize(todo_description),
      token_storage: token_storage,
    };
    // Send Post to Express
    fetch(`${urlPath}secure/add`, {
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
    const url = `${urlPath}secure/delete-todo/${todo_id}`;

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
    const todo_name = DOMPurify.sanitize(
      document.getElementById(`todo_name-${todo_id}`).value
    );

    const todo_description = DOMPurify.sanitize(
      document.getElementById(`todo_description-${todo_id}`).value
    );

    if (todo_name.length < 1 || todo_description.length < 1) {
      Swal.fire({
        title: `All Todos need names & descriptions.`,
        icon: "warning",
      });

      return;
    }

    const upTodo = {
      todo_name: todo_name,
      todo_description: todo_description,
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
    const url = `${urlPath}secure/update-todo/${todo_id}`;
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
