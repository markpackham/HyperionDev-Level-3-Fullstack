import { useFormik } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";

const ulrPath = "http://localhost:8080/todos/";

const handleRegister = (event) => {
  event.preventDefault();

  let username = document.getElementById("username_add").value;
  let password = document.getElementById("password_add").value;

  const user = {
    username: DOMPurify.sanitize(username),
    password: DOMPurify.sanitize(password),
  };
  // Send Post to Express
  fetch(`${ulrPath}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).catch((error) => {
    console.log(error);
  });
};

const Register = () => {
  // Use Formik and Yup for field validation
  const validationSchema = Yup.object({
    username_add: Yup.string().required("Gmail is required"),
    password_add: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain At Least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Required"),
    password_confirm_add: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      username_add: "",
      password_add: "",
      password_confirm_add: "",
    },
    validationSchema,
  });

  return (
    <>
      <h4>Register</h4>
      <p>
        Username must end in @gmail.com e.g. <strong>bob@gmail.com</strong> and
        password must be at least 8 characters with 1 uppercase, one lower case
        and 1 special character e.g. <strong>Password9#</strong>
      </p>
      <form className="form-group col-sm-12 col-md-6">
        <label htmlFor="username_add">Gmail Account:</label>
        <input
          id="username_add"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username_add}
        />

        {formik.touched.username_add && formik.errors.username_add ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.username_add}
          </div>
        ) : null}

        <label htmlFor="password_add">Password:</label>
        <input
          id="password_add"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password_add}
        />

        {formik.touched.password_add && formik.errors.password_add ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.password_add}
          </div>
        ) : null}

        <label htmlFor="password_confirm_add">Password Again:</label>
        <input
          id="password_confirm_add"
          type="password"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password_confirm_add}
        />

        {formik.touched.password_confirm_add &&
        formik.errors.password_confirm_add ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.password_confirm_add}
          </div>
        ) : null}

        <button onClick={handleRegister} className="btn btn-success">
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
