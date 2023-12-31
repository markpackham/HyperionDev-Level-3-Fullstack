import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { urlPath } from "../../global";

const Login = () => {
  // Do redirect after form submission
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const token_storage = sessionStorage.getItem("jwt_token");

  const validationSchema = Yup.object({
    username: Yup.string().email().required("Username as gmail required"),
    password: Yup.string().required("Password required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
  });

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    // DOMPurify prevents script injections
    const res = await axios.post(`${urlPath}login`, {
      username: DOMPurify.sanitize(formik.values.username),
      password: DOMPurify.sanitize(formik.values.password),
    });

    if (res.status === 403) {
      alert(res.data.message);
    }

    if (res.status === 200 && res.data != "Incorrect user credentials") {
      //alert(res.data.message);

      Swal.fire({
        title: res.data.message,
        icon: "success",
      });

      setToken[res.data.token];
      sessionStorage.setItem("jwt_token", res.data.token);
      navigate("/");
    }
  };

  return (
    <>
      <h1>Login</h1>
      {token_storage && (
        <h4 className="text-success mt-4 mb-4">
          Congrats, you are logged in, please go <Link to="/">Home</Link> to
          added todos!
        </h4>
      )}
      <p>
        Example username & password: <strong>bob@gmail.com</strong> -{" "}
        <strong>Password9#</strong>
      </p>
      <div className="list-group">
        <form onSubmit={handleLogin}>
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <label>
                Username:
                <input
                  id="username"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className="form-control"
                />
              </label>
              {formik.touched.username && formik.errors.username ? (
                <div className="fw-bold text-danger mb-1">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className="col-sm-6 col-md-3">
              <label>
                Password:
                <input
                  id="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="form-control"
                />
              </label>
              {formik.touched.password && formik.errors.password ? (
                <div className="fw-bold text-danger mb-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
