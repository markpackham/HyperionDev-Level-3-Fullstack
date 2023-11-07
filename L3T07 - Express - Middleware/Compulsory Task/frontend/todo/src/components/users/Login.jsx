import { useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const ulrPath = "http://localhost:8080/todos/";

  const validationSchema = Yup.object({
    username: Yup.string().required("Username required"),
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
    const res = await axios.post(`${ulrPath}login`, {
      username,
      password,
    });

    if (res.status === 403) {
      alert(res.data.message);
    }

    if (res.status === 200 && res.data != "Incorrect user credentials") {
      alert(res.data.message);
      setToken[res.data.token];
      sessionStorage.setItem("jwt_token", res.data.token);
    }
  };

  return (
    <>
      <h4>Login</h4>
      <div className="list-group">
        <form onSubmit={handleLogin}>
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <label>
                Username: user@gmail.com
                <input
                  id="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={formik.handleBlur}
                  value={formik.username}
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
                Password: password
                <input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={formik.handleBlur}
                  value={formik.password}
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

Login.propTypes = {
  ulrPath: PropTypes.string,
};

export default Login;
