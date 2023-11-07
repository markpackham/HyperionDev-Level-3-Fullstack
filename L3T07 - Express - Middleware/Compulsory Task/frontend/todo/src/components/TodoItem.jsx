import PropTypes from "prop-types";

const TodoItem = ({ todos, updateTodo, deleteTodo }) => {
  const token_storage = sessionStorage.getItem("jwt_token");

  return (
    <>
      {token_storage && (
        <>
          <h5 className="mb-2">Name - Description</h5>
          <div className="list-group">
            {(todos.length > 0 &&
              todos.map((todo) => (
                <div
                  className="list-group-item list-group-item-action"
                  key={todo.todo_id}
                >
                  <div className="row">
                    <div className="col-sm-6 col-md-2">
                      <input
                        id={`todo_name-${todo.todo_id}`}
                        className="form-control"
                        type="text"
                        defaultValue={todo.todo_name}
                        title="todo_name"
                      />
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <input
                        id={`todo_description-${todo.todo_id}`}
                        className="form-control"
                        type="text"
                        defaultValue={todo.todo_description}
                        title="todo_description"
                      />
                    </div>

                    {todo.todo_id}
                    <div className="col-sm-12 col-md-4">
                      <button
                        onClick={() => updateTodo(todo.todo_id)}
                        className="btn btn-info"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.todo_id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))) || <h3>Loading ...</h3>}
          </div>
        </>
      )}
    </>
  );
};

TodoItem.propTypes = {
  todos: PropTypes.array.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
