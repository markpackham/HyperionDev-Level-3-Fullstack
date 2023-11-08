import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const AddTodo = ({ handleAddTodo, handleClearAddTodo }) => {
  const token_storage = sessionStorage.getItem("jwt_token");

  // Use Formik and Yup for field validation
  const validationSchema = Yup.object({
    todo_name_add: Yup.string().max(100).required("Todo name is required"),
    todo_description_add: Yup.string()
      .max(140)
      .required("Todo description is required"),
  });

  const formik = useFormik({
    initialValues: {
      todo_name_add: "",
      todo_description_add: "",
    },
    validationSchema,
  });

  return (
    <>
      {token_storage ? (
        <>
          {" "}
          <h4>Add Todo</h4>
          <form className="form-group col-sm-12 col-md-6">
            <label htmlFor="todo_name_add">Name:</label>
            <input
              id="todo_name_add"
              type="text"
              className="form-control"
              {...formik.getFieldProps("todo_name_add")}
            />

            {formik.touched.todo_name_add && formik.errors.todo_name_add ? (
              <div className="fw-bold text-danger mb-1">
                {formik.errors.todo_name_add}
              </div>
            ) : null}

            <label htmlFor="todo_description_add">
              Description (Max 140 characters):
            </label>
            <input
              id="todo_description_add"
              type="text"
              className="form-control"
              {...formik.getFieldProps("todo_description_add")}
            />

            {formik.touched.todo_description_add &&
            formik.errors.todo_description_add ? (
              <div className="fw-bold text-danger mb-1">
                {formik.errors.todo_description_add}
              </div>
            ) : null}

            <button
              onClick={handleAddTodo}
              disabled={!formik.isValid}
              className="btn btn-success"
            >
              Add Todo
            </button>

            <button onClick={handleClearAddTodo} className="btn btn-primary">
              Clear
            </button>
          </form>
        </>
      ) : (
        <h4>Please login or register to use this app.</h4>
      )}
    </>
  );
};

// Make sure all the correct functions are supplied to this component
AddTodo.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
  handleClearAddTodo: PropTypes.func.isRequired,
};

export default AddTodo;
