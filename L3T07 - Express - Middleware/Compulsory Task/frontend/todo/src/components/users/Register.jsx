import { useFormik } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ulrPath = "http://localhost:8080/todos/";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

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
    })
      .then((res) => {
        if (res.status === 200) {
          // Registration successful, redirect to login
          Swal.fire({
            title: `You're registered`,
            icon: "success",
          });
          navigate("/login");
        } else {
          console.error("Registration failed:", res.statusText);
          Swal.fire({
            title: "Registration Failed",
            text: res.statusText,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        Swal.fire({
          title: "Registration Error",
          text: error.message,
          icon: "error",
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      password_confirm: "",
    },
    validationSchema,
  });

  // Use Formik and Yup for field validation
  const validationSchema = Yup.object({
    username: Yup.string().email().required("Gmail is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain At Least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Required"),
    password_confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
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
        <label htmlFor="username">Username Gmail Account:</label>
        <input
          id="username"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />

        {formik.touched.username && formik.errors.username ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.username}
          </div>
        ) : null}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />

        {formik.touched.password && formik.errors.password ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.password}
          </div>
        ) : null}

        <label htmlFor="password_confirm">Password Again:</label>
        <input
          id="password_confirm"
          type="password"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password_confirm}
        />

        {formik.touched.password_confirm && formik.errors.password_confirm ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.password_confirm}
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
