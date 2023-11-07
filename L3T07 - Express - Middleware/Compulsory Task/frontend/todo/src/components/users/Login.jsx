import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const ulrPath = "http://localhost:8080/todos/";

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${ulrPath}login`, {
      username,
      password,
    });

    console.log("This ran");
    console.log(res);

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
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                />
              </label>
            </div>
            <div className="col-sm-6 col-md-3">
              <label>
                Password: password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </label>
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
